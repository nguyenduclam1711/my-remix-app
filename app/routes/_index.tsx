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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <PopOver content="something here">
        <button>
          button
        </button>
      </PopOver>
      <PopOver content="something here">
        <input />
      </PopOver>
    </div>
  );
}
