import type { MetaFunction } from "@remix-run/node";
import PopOver from "~/components/PopOver";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        padding: "1200px 1000px 500px 1000px",
      }}
    >
      <PopOver content="something here">
        <button>button</button>
      </PopOver>
      <PopOver content="something here">
        <input />
      </PopOver>
      <PopOver content="kladjfklsdajf">
        <span>hehe</span>
      </PopOver>
      <PopOver
        content={
          <div>
            <div>
              <input />
            </div>
            <div>
              <button>bo may huy diet</button>
            </div>
          </div>
        }
      >
        <div style={{
          margin: 80,
        }}>
          <button
            style={{
              width: 100,
              padding: 100,
            }}
          >
            test button
          </button>
        </div>
      </PopOver>
    </div>
  );
}
