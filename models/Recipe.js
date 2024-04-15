// /* eslint-disable camelcase */
// import { Model } from "objection";
// import BaseModel from "./BaseModel";

// export default class Article extends BaseModel {
//   // Table name is the only required property.
//   static get tableName() {
//     return "Article";
//   }

//   // Objection.js assumes primary key is `id` by default

//   static get jsonSchema() {
//     return {
//       type: "object",
//       required: ["title"],
//       properties: {
//         id: { type: "integer" },
//         title: { type: "string" },
//         contents: { type: "string", default: "" },
//         edited: { type: "string", format: "date-time" },
//       },
//     };
//   }

//   static relationMappings = {
//     related: {
//       relation: Model.ManyToManyRelation,
//       modelClass: Article, // eslint-disable-line no-use-before-define
//       join: {
//         from: "Article.id",
//         through: {
//           // RelatedArticle is the join table. These names must match the schema
//           from: "RelatedArticle.articleId",
//           to: "RelatedArticle.relatedId",
//         },
//         to: "Article.id",
//       },
//     },
//   };
// }
