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
        <div>hehe</div>
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
        <button
          style={{
            width: 100,
            padding: 80,
            margin: 80,
          }}
        >
          test button
        </button>
      </PopOver>
    </div>
  );
}
