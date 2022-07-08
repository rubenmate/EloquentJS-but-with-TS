import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    // NOTE: This is necessary so we don't ship test code to production
    define: {
        "import.meta.vitest": "undefined",
    },
    test: {
        // NOTE: This will look for tests in all source files instead of just looking for .test.js/.test.ts.
        // We also need to include the following to tsconfig.json
        // "types": [
        //     "vitest/importMeta"
        // ]
        includeSource: ["src/**/*.{js,ts}"],
        exclude: [...configDefaults.exclude, "src/chapter-7-project/base.ts"],
    },
});
