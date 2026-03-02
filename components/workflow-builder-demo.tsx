"use client";

import { useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { FaComment, FaWrench, FaCodeBranch, FaClock, FaSatelliteDish } from "react-icons/fa6";

type BlockType = "prompt" | "tool" | "branch" | "wait" | "webhook";

type NodeItem = {
  id: string;
  type: BlockType;
  label: string;
};

const blockLibrary: Array<{ type: BlockType; label: string; hint: string; icon: IconType }> = [
  { type: "prompt", label: "Prompt", hint: "Set model behavior", icon: FaComment },
  { type: "tool", label: "Tool Call", hint: "Invoke external API", icon: FaWrench },
  { type: "branch", label: "Branch", hint: "Route by condition", icon: FaCodeBranch },
  { type: "wait", label: "Wait", hint: "Time/event gating", icon: FaClock },
  { type: "webhook", label: "Webhook", hint: "Emit lifecycle payload", icon: FaSatelliteDish }
];

const seedFlow: NodeItem[] = [
  { id: "seed-1", type: "prompt", label: "Session Init" },
  { id: "seed-2", type: "tool", label: "CRM Lookup" },
  { id: "seed-3", type: "branch", label: "Escalation Check" },
  { id: "seed-4", type: "webhook", label: "Finalize" }
];

function toDsl(flow: NodeItem[]) {
  return {
    version: "1",
    stages: flow.map((item, index) => ({
      id: `stage_${index + 1}`,
      kind: item.type,
      name: item.label
    }))
  };
}

export default function WorkflowBuilderDemo() {
  const [flow, setFlow] = useState<NodeItem[]>(seedFlow);
  const [dragType, setDragType] = useState<BlockType | null>(null);

  const jsonPreview = useMemo(() => JSON.stringify(toDsl(flow), null, 2), [flow]);

  function addBlock(type: BlockType) {
    const libraryItem = blockLibrary.find((item) => item.type === type);
    if (!libraryItem) return;

    const node: NodeItem = {
      id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      type,
      label: libraryItem.label
    };

    setFlow((prev) => [...prev, node]);
  }

  return (
    <div className="grid-2">
      <div className="card">
        <div className="section-label" style={{ marginBottom: 8 }}>Block Library</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
          Click or drag blocks into the canvas.
        </p>

        <ul className="inline-list">
          {blockLibrary.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.type}>
                <button
                  type="button"
                  className="builder-item"
                  draggable
                  onDragStart={() => setDragType(item.type)}
                  onClick={() => addBlock(item.type)}
                  style={{ width: "100%", cursor: "grab", border: "1px solid var(--border)" }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <Icon style={{ fontSize: 14, color: "var(--accent)" }} />
                    <span style={{ fontWeight: 500 }}>{item.label}</span>
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {item.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="card"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => {
          if (dragType) {
            addBlock(dragType);
            setDragType(null);
          }
        }}
      >
        <div className="section-label" style={{ marginBottom: 8 }}>Workflow Canvas</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
          Every block maps to deterministic JSON DSL.
        </p>

        <div className="builder-canvas">
          <ul className="inline-list">
            {flow.map((node) => (
              <li className="builder-item" key={node.id}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <strong>{node.label}</strong>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {node.type}
                  </span>
                </span>
                <button
                  type="button"
                  className="btn-secondary btn-small"
                  onClick={() => setFlow((prev) => prev.filter((item) => item.id !== node.id))}
                  style={{ padding: "4px 10px", fontSize: 12 }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>JSON Preview</div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-dot" />
              <span className="code-title">workflow.json</span>
            </div>
            <div className="code-body">
              <pre style={{ color: "var(--accent)", fontSize: 12 }}>{jsonPreview}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
