import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// FSD (Feature-Sliced Design) layer boundaries.
// A layer may only import from itself or from layers strictly below it:
// app -> widgets -> features -> entities -> shared
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/**" },
        { type: "widgets", mode: "folder", pattern: "packages/widgets/src/*", capture: ["slice"] },
        { type: "features", mode: "folder", pattern: "packages/features/src/*", capture: ["slice"] },
        { type: "entities", mode: "folder", pattern: "packages/entities/src/*", capture: ["slice"] },
        { type: "shared", mode: "folder", pattern: "packages/shared/src/*" },
      ],
    },
    rules: {
      // A slice may reach into itself and into any slice of a strictly
      // lower layer, but never sideways into a sibling slice of its own
      // layer (that composition only happens in the app layer) or upward.
      "boundaries/element-types": ["error", {
        default: "disallow",
        rules: [
          { from: "app", allow: ["app", "widgets", "features", "entities", "shared"] },
          {
            from: "widgets",
            allow: [
              ["widgets", { slice: "${from.slice}" }],
              "features", "entities", "shared",
            ],
          },
          {
            from: "features",
            allow: [
              ["features", { slice: "${from.slice}" }],
              "entities", "shared",
            ],
          },
          {
            from: "entities",
            allow: [
              ["entities", { slice: "${from.slice}" }],
              "shared",
            ],
          },
          { from: "shared", allow: ["shared"] },
        ],
      }],
    },
  },
];

export default eslintConfig;
