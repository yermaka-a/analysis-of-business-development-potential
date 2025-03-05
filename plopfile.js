export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a Vue component with TypeScript",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name?",
      },
      {
        type: "confirm",
        name: "createTypes",
        message: "Do you want to create a type file?",
        default: false,
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.vue",
        templateFile: "plop-templates/Component.vue.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/types.ts",
        templateFile: "plop-templates/types.ts.hbs",
        skipIfExists: true,
        when: (answers) => answers.createTypes,
      },
    ],
  });
}
