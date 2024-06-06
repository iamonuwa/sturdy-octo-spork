import { prettierParsers, supportedLanguages } from "./prettier";

import prettier from "prettier/standalone";

const plugins = [
    require("prettier/parser-babel"),
    // require("prettier/parser-babylon"),
    // require("prettier/parser-html"),
    // require("prettier/parser-postcss"),
    // require("prettier/parser-graphql"),
    // require("prettier/parser-markdown"),
    // require("prettier/parser-yaml"),
    // require("prettier/parser-flow"),
    // require("prettier/parser-typescript")
];

export async function prettify(language: string, value: string) {
    let result;

    if (!supportedLanguages.includes(language)) return value;

    if (language === "json") {
        result = JSON.stringify(JSON.parse(value), null, 2);
    } else {
        result = await prettier.format(value, {
            parser: prettierParsers[language as keyof typeof prettierParsers] || language,
            plugins,
            semi: false
        });
    }

    return result;
}
