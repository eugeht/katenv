module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-idiomatic-order"
  ],
  "plugins": [
		"stylelint-scss",
		"stylelint-order",
	],
  "rules": {
    "declaration-empty-line-before": null,
    "order/properties-alphabetical-order": null,

    "selector-class-pattern": null,

    "no-descending-specificity": null,

    "scss/double-slash-comment-empty-line-before": null,
  
    // Order
		"order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "at-rules", {
        "type": "at-rule",
        "name": "include",
        "parameter": "center"
      },
      "less-mixins",
      "rules"
    ],
    "order/properties-order": [[
      {
        "emptyLineBefore": "always",
        "order": "flexible",
        "properties": [
          "position",
          "top",
          "right",
          "bottom",
          "left",
          "z-index"
        ]
      },
      {
        "emptyLineBefore": "always",
        "order": "flexible",
        "properties": [
          "display",
          "box-sizing",
          "float",
          "width",
          "height",
          "max-width",
          "max-height",
          "min-width",
          "min-height",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "margin-collapse",
          "margin-top-collapse",
          "margin-right-collapse",
          "margin-bottom-collapse",
          "margin-left-collapse",
          "overflow",
          "overflow-x",
          "overflow-y",
          "clip",
          "clear"
        ]
      },
      {
        "emptyLineBefore": "always",
        "order": "flexible",
        "properties": [
          "flex-flow",
          "flex-direction",
          "flex-wrap",
          "justify-content",
          "align-items",
          "align-content"
        ]
      },
      {
        "emptyLineBefore": "always",
        "order": "flexible",
        "properties": [
          "order",
          "flex",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "align-self"
        ]
      }
    ], { "unspecified": "bottom" }]
	}
}
