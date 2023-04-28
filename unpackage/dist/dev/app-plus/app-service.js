if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$a = {
    name: "UniSwiperDot",
    emits: ["clickItem"],
    props: {
      info: {
        type: Array,
        default() {
          return [];
        }
      },
      current: {
        type: Number,
        default: 0
      },
      dotsStyles: {
        type: Object,
        default() {
          return {};
        }
      },
      // 类型 ：default(默认) indexes long nav
      mode: {
        type: String,
        default: "default"
      },
      // 只在 nav 模式下生效，变量名称
      field: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dots: {
          width: 6,
          height: 6,
          bottom: 10,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, .3)",
          border: "1px rgba(0, 0, 0, .3) solid",
          selectedBackgroundColor: "#333",
          selectedBorder: "1px rgba(0, 0, 0, .9) solid"
        }
      };
    },
    watch: {
      dotsStyles(newVal) {
        this.dots = Object.assign(this.dots, this.dotsStyles);
      },
      mode(newVal) {
        if (newVal === "indexes") {
          this.dots.width = 14;
          this.dots.height = 14;
        } else {
          this.dots.width = 6;
          this.dots.height = 6;
        }
      }
    },
    created() {
      if (this.mode === "indexes") {
        this.dots.width = 12;
        this.dots.height = 12;
      }
      this.dots = Object.assign(this.dots, this.dotsStyles);
    },
    methods: {
      clickItem(index) {
        this.$emit("clickItem", index);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-swiper__warp" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.mode === "default" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          style: vue.normalizeStyle({ "bottom": $data.dots.bottom + "px" }),
          class: "uni-swiper__dots-box",
          key: "default"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.info, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $options.clickItem(index),
                style: vue.normalizeStyle({
                  "width": (index === $props.current ? $data.dots.width * 2 : $data.dots.width) + "px",
                  "height": $data.dots.width / 2 + "px",
                  "background-color": index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
                  "border-radius": "0px"
                }),
                key: index,
                class: "uni-swiper__dots-item uni-swiper__dots-bar"
              }, null, 12, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.mode === "dot" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          style: vue.normalizeStyle({ "bottom": $data.dots.bottom + "px" }),
          class: "uni-swiper__dots-box",
          key: "dot"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.info, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $options.clickItem(index),
                style: vue.normalizeStyle({
                  "width": $data.dots.width + "px",
                  "height": $data.dots.height + "px",
                  "background-color": index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
                  "border": index !== $props.current ? $data.dots.border : $data.dots.selectedBorder
                }),
                key: index,
                class: "uni-swiper__dots-item"
              }, null, 12, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.mode === "round" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          style: vue.normalizeStyle({ "bottom": $data.dots.bottom + "px" }),
          class: "uni-swiper__dots-box",
          key: "round"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.info, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $options.clickItem(index),
                class: vue.normalizeClass([[index === $props.current && "uni-swiper__dots-long"], "uni-swiper__dots-item"]),
                style: vue.normalizeStyle({
                  "width": (index === $props.current ? $data.dots.width * 3 : $data.dots.width) + "px",
                  "height": $data.dots.height + "px",
                  "background-color": index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
                  "border": index !== $props.current ? $data.dots.border : $data.dots.selectedBorder
                }),
                key: index
              }, null, 14, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.mode === "nav" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: "nav",
          style: vue.normalizeStyle({ "background-color": $props.dotsStyles.backgroundColor, "bottom": "0" }),
          class: "uni-swiper__dots-box uni-swiper__dots-nav"
        },
        [
          vue.createElementVNode(
            "text",
            {
              style: vue.normalizeStyle({ "color": $props.dotsStyles.color }),
              class: "uni-swiper__dots-nav-item"
            },
            vue.toDisplayString($props.current + 1 + "/" + $props.info.length + " " + $props.info[$props.current][$props.field]),
            5
            /* TEXT, STYLE */
          )
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.mode === "indexes" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: "indexes",
          style: vue.normalizeStyle({ "bottom": $data.dots.bottom + "px" }),
          class: "uni-swiper__dots-box"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.info, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $options.clickItem(index),
                style: vue.normalizeStyle({
                  "width": $data.dots.width + "px",
                  "height": $data.dots.height + "px",
                  "color": index === $props.current ? $data.dots.selectedColor : $data.dots.color,
                  "background-color": index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
                  "border": index !== $props.current ? $data.dots.border : $data.dots.selectedBorder
                }),
                key: index,
                class: "uni-swiper__dots-item uni-swiper__dots-indexes"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-swiper__dots-indexes-text" },
                  vue.toDisplayString(index + 1),
                  1
                  /* TEXT */
                )
              ], 12, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$8], ["__scopeId", "data-v-0667e3db"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _sfc_main$9 = {
    name: "uniTh",
    options: {
      virtualHost: true
    },
    components: {},
    emits: ["sort-change", "filter-change"],
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      },
      sortable: {
        type: Boolean,
        default: false
      },
      filterType: {
        type: String,
        default: ""
      },
      filterData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        border: false,
        ascending: false,
        descending: false
      };
    },
    computed: {
      // 根据props中的width属性 自动匹配当前th的宽度(px)
      customWidth() {
        if (typeof this.width === "number") {
          return this.width;
        } else if (typeof this.width === "string") {
          let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
          let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
          let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
          if (this.width.match(regexHaveUnitPx) !== null) {
            return this.width.replace("px", "");
          } else if (this.width.match(regexHaveUnitRpx) !== null) {
            let numberRpx = Number(this.width.replace("rpx", ""));
            let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
            return Math.round(numberRpx * widthCoe);
          } else if (this.width.match(regexHaveNotUnit) !== null) {
            return this.width;
          } else {
            return "";
          }
        } else {
          return "";
        }
      },
      contentAlign() {
        let align = "left";
        switch (this.align) {
          case "left":
            align = "flex-start";
            break;
          case "center":
            align = "center";
            break;
          case "right":
            align = "flex-end";
            break;
        }
        return align;
      }
    },
    created() {
      this.root = this.getTable("uniTable");
      this.rootTr = this.getTable("uniTr");
      this.rootTr.minWidthUpdate(this.customWidth ? this.customWidth : 140);
      this.border = this.root.border;
      this.root.thChildren.push(this);
    },
    methods: {
      sort() {
        if (!this.sortable)
          return;
        this.clearOther();
        if (!this.ascending && !this.descending) {
          this.ascending = true;
          this.$emit("sort-change", { order: "ascending" });
          return;
        }
        if (this.ascending && !this.descending) {
          this.ascending = false;
          this.descending = true;
          this.$emit("sort-change", { order: "descending" });
          return;
        }
        if (!this.ascending && this.descending) {
          this.ascending = false;
          this.descending = false;
          this.$emit("sort-change", { order: null });
        }
      },
      ascendingFn() {
        this.clearOther();
        this.ascending = !this.ascending;
        this.descending = false;
        this.$emit("sort-change", { order: this.ascending ? "ascending" : null });
      },
      descendingFn() {
        this.clearOther();
        this.descending = !this.descending;
        this.ascending = false;
        this.$emit("sort-change", { order: this.descending ? "descending" : null });
      },
      clearOther() {
        this.root.thChildren.map((item) => {
          if (item !== this) {
            item.ascending = false;
            item.descending = false;
          }
          return item;
        });
      },
      ondropdown(e) {
        this.$emit("filter-change", e);
      },
      /**
       * 获取父元素实例
       */
      getTable(name) {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-th", { "table--border": $data.border }]),
        style: vue.normalizeStyle({ width: $options.customWidth + "px", "text-align": $props.align })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$7], ["__scopeId", "data-v-bf970acd"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-table/components/uni-th/uni-th.vue"]]);
  const _sfc_main$8 = {
    name: "TableCheckbox",
    emits: ["checkboxSelected"],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      cellData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    watch: {
      checked(newVal) {
        if (typeof this.checked === "boolean") {
          this.isChecked = newVal;
        } else {
          this.isChecked = true;
        }
      },
      indeterminate(newVal) {
        this.isIndeterminate = newVal;
      }
    },
    data() {
      return {
        isChecked: false,
        isDisabled: false,
        isIndeterminate: false
      };
    },
    created() {
      if (typeof this.checked === "boolean") {
        this.isChecked = this.checked;
      }
      this.isDisabled = this.disabled;
    },
    methods: {
      selected() {
        if (this.isDisabled)
          return;
        this.isIndeterminate = false;
        this.isChecked = !this.isChecked;
        this.$emit("checkboxSelected", {
          checked: this.isChecked,
          data: this.cellData
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-table-checkbox",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.selected && $options.selected(...args))
    }, [
      !$props.indeterminate ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox__inner", { "is-checked": $data.isChecked, "is-disable": $data.isDisabled }])
        },
        [
          vue.createElementVNode("view", { class: "checkbox__inner-icon" })
        ],
        2
        /* CLASS */
      )) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "checkbox__inner checkbox--indeterminate"
      }, [
        vue.createElementVNode("view", { class: "checkbox__inner-icon" })
      ]))
    ]);
  }
  const tableCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$6], ["__scopeId", "data-v-25e435b1"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-table/components/uni-tr/table-checkbox.vue"]]);
  const _sfc_main$7 = {
    name: "uniTr",
    components: { tableCheckbox },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      keyValue: {
        type: [String, Number],
        default: ""
      }
    },
    options: {
      virtualHost: true
    },
    data() {
      return {
        value: false,
        border: false,
        selection: false,
        widthThArr: [],
        ishead: true,
        checked: false,
        indeterminate: false
      };
    },
    created() {
      this.root = this.getTable();
      this.head = this.getTable("uniThead");
      if (this.head) {
        this.ishead = false;
        this.head.init(this);
      }
      this.border = this.root.border;
      this.selection = this.root.type;
      this.root.trChildren.push(this);
      const rowData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
      if (rowData) {
        this.rowData = rowData;
      }
      this.root.isNodata();
    },
    mounted() {
      if (this.widthThArr.length > 0) {
        const selectionWidth = this.selection === "selection" ? 50 : 0;
        this.root.minWidth = this.widthThArr.reduce((a, b) => Number(a) + Number(b)) + selectionWidth;
      }
    },
    unmounted() {
      const index = this.root.trChildren.findIndex((i) => i === this);
      this.root.trChildren.splice(index, 1);
      this.root.isNodata();
    },
    methods: {
      minWidthUpdate(width) {
        this.widthThArr.push(width);
      },
      // 选中
      checkboxSelected(e) {
        let rootData = this.root.data.find((v) => v[this.root.rowKey] === this.keyValue);
        this.checked = e.checked;
        this.root.check(rootData || this, e.checked, rootData ? this.keyValue : null);
      },
      change(e) {
        this.root.trChildren.forEach((item) => {
          if (item === this) {
            this.root.check(this, e.detail.value.length > 0 ? true : false);
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getTable(name = "uniTable") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_table_checkbox = vue.resolveComponent("table-checkbox");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-table-tr" }, [
      $data.selection === "selection" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["checkbox", { "tr-table--border": $data.border }])
        },
        [
          vue.createVNode(_component_table_checkbox, {
            checked: $data.checked,
            indeterminate: $data.indeterminate,
            disabled: $props.disabled,
            onCheckboxSelected: $options.checkboxSelected
          }, null, 8, ["checked", "indeterminate", "disabled", "onCheckboxSelected"])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5], ["__scopeId", "data-v-b48b3e32"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-table/components/uni-tr/uni-tr.vue"]]);
  const _sfc_main$6 = {
    name: "uniTd",
    options: {
      virtualHost: true
    },
    props: {
      width: {
        type: [String, Number],
        default: ""
      },
      align: {
        type: String,
        default: "left"
      },
      rowspan: {
        type: [Number, String],
        default: 1
      },
      colspan: {
        type: [Number, String],
        default: 1
      }
    },
    data() {
      return {
        border: false
      };
    },
    created() {
      this.root = this.getTable();
      this.border = this.root.border;
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getTable() {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== "uniTable") {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(` :class="{'table--border':border}"  `),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table-td", { "table--border": $data.border }]),
            style: vue.normalizeStyle({ width: $props.width + "px", "text-align": $props.align })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4], ["__scopeId", "data-v-edae4802"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-table/components/uni-td/uni-td.vue"]]);
  const _sfc_main$5 = {
    name: "uniTable",
    options: {
      virtualHost: true
    },
    emits: ["selection-change"],
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否有竖线
      border: {
        type: Boolean,
        default: false
      },
      // 是否显示斑马线
      stripe: {
        type: Boolean,
        default: false
      },
      // 多选
      type: {
        type: String,
        default: ""
      },
      // 没有更多数据
      emptyText: {
        type: String,
        default: "没有更多数据"
      },
      loading: {
        type: Boolean,
        default: false
      },
      rowKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        noData: true,
        minWidth: 0,
        multiTableHeads: []
      };
    },
    watch: {
      loading(val) {
      },
      data(newVal) {
        this.theadChildren;
        if (this.theadChildren) {
          this.theadChildren.rowspan;
        }
        this.noData = false;
      }
    },
    created() {
      this.trChildren = [];
      this.thChildren = [];
      this.theadChildren = null;
      this.backData = [];
      this.backIndexData = [];
    },
    methods: {
      isNodata() {
        this.theadChildren;
        let rowspan = 1;
        if (this.theadChildren) {
          rowspan = this.theadChildren.rowspan;
        }
        this.noData = this.trChildren.length - rowspan <= 0;
      },
      /**
       * 选中所有
       */
      selectionAll() {
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        let isHaveData = this.data && this.data.length > 0;
        theadChildren.checked = true;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            item.checked = true;
            if (isHaveData && item.keyValue) {
              const row = this.data.find((v) => v[this.rowKey] === item.keyValue);
              if (!this.backData.find((v) => v[this.rowKey] === row[this.rowKey])) {
                this.backData.push(row);
              }
            }
            if (index > startIndex - 1 && this.backIndexData.indexOf(index - startIndex) === -1) {
              this.backIndexData.push(index - startIndex);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
       */
      toggleRowSelection(row, selected) {
        row = [].concat(row);
        this.trChildren.forEach((item, index) => {
          const select = row.findIndex((v) => {
            if (typeof v === "number") {
              return v === index - 1;
            } else {
              return v[this.rowKey] === item.keyValue;
            }
          });
          let ischeck = item.checked;
          if (select !== -1) {
            if (typeof selected === "boolean") {
              item.checked = selected;
            } else {
              item.checked = !item.checked;
            }
            if (ischeck !== item.checked) {
              this.check(item.rowData || item, item.checked, item.rowData ? item.keyValue : null, true);
            }
          }
        });
        this.$emit("selection-change", {
          detail: {
            value: this.backData,
            index: this.backIndexData
          }
        });
      },
      /**
       * 用于多选表格，清空用户的选择
       */
      clearSelection() {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        theadChildren.checked = false;
        theadChildren.indeterminate = false;
        this.trChildren.forEach((item) => {
          item.checked = false;
        });
        this.backData = [];
        this.backIndexData = [];
        this.$emit("selection-change", {
          detail: {
            value: [],
            index: []
          }
        });
      },
      /**
       * 用于多选表格，切换所有行的选中状态
       */
      toggleAllSelection() {
        let list = [];
        let startIndex = 1;
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        } else {
          startIndex = theadChildren.rowspan - 1;
        }
        this.trChildren.forEach((item, index) => {
          if (!item.disabled) {
            if (index > startIndex - 1) {
              list.push(index - startIndex);
            }
          }
        });
        this.toggleRowSelection(list);
      },
      /**
       * 选中\取消选中
       * @param {Object} child
       * @param {Object} check
       * @param {Object} rowValue
       */
      check(child, check, keyValue, emit) {
        let theadChildren = this.theadChildren;
        if (!this.theadChildren) {
          theadChildren = this.trChildren[0];
        }
        let childDomIndex = this.trChildren.findIndex((item, index) => child === item);
        if (childDomIndex < 0) {
          childDomIndex = this.data.findIndex((v) => v[this.rowKey] === keyValue) + 1;
        }
        this.trChildren.filter((v) => !v.disabled && v.keyValue).length;
        if (childDomIndex === 0) {
          check ? this.selectionAll() : this.clearSelection();
          return;
        }
        if (check) {
          if (keyValue) {
            this.backData.push(child);
          }
          this.backIndexData.push(childDomIndex - 1);
        } else {
          const index = this.backData.findIndex((v) => v[this.rowKey] === keyValue);
          const idx = this.backIndexData.findIndex((item) => item === childDomIndex - 1);
          if (keyValue) {
            this.backData.splice(index, 1);
          }
          this.backIndexData.splice(idx, 1);
        }
        const domCheckAll = this.trChildren.find((item, index) => index > 0 && !item.checked && !item.disabled);
        if (!domCheckAll) {
          theadChildren.indeterminate = false;
          theadChildren.checked = true;
        } else {
          theadChildren.indeterminate = true;
          theadChildren.checked = false;
        }
        if (this.backIndexData.length === 0) {
          theadChildren.indeterminate = false;
        }
        if (!emit) {
          this.$emit("selection-change", {
            detail: {
              value: this.backData,
              index: this.backIndexData
            }
          });
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-table-scroll", { "table--border": $props.border, "border-none": !$data.noData }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-table", { "table--stripe": $props.stripe }]),
            style: vue.normalizeStyle({ "min-width": $data.minWidth + "px" })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
            $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-table-loading"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-table-text", { "empty-border": $props.border }])
                },
                vue.toDisplayString($props.emptyText),
                3
                /* TEXT, CLASS */
              )
            ])) : vue.createCommentVNode("v-if", true),
            $props.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: vue.normalizeClass(["uni-table-mask", { "empty-border": $props.border }])
              },
              [
                vue.createElementVNode("div", { class: "uni-table--loader" })
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3], ["__scopeId", "data-v-c1ea9b5d"], ["__file", "F:/Code/HbuilderX/ZhiJia/uni_modules/uni-table/components/uni-table/uni-table.vue"]]);
  const _imports_0 = "/static/alicon/manage.svg";
  const _imports_1 = "/static/alicon/right.svg";
  const _sfc_main$4 = {
    __name: "home",
    setup(__props) {
      let current = vue.ref(0);
      let swiperDotIndex = vue.ref(0);
      const info = [
        {
          colorClass: "uni-bg-red",
          url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
          content: "内容 A"
        },
        {
          colorClass: "uni-bg-green",
          url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
          content: "内容 B"
        },
        {
          colorClass: "uni-bg-blue",
          url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
          content: "内容 C"
        }
      ];
      const dotStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        color: "#fff",
        selectedBackgroundColor: "rgba(255, 255, 255, 1)",
        selectedBorder: "1px rgba(202, 202, 202, 0.9) solid",
        border: "1px rgba(83, 200, 249,0.3) solid"
      };
      const otherBoxList = [{
        name: "信息录入",
        imgUrl: "/static/alicon/edit-fill.svg"
      }, {
        name: "服务查询",
        imgUrl: "/static/alicon/security scan-fill.svg"
      }, {
        name: "我要定位",
        imgUrl: "/static/alicon/location-fill.svg"
      }];
      const change = (e) => {
        current.value = e.detail.current;
      };
      const clickItem = (e) => {
        swiperDotIndex.value = e;
      };
      return (_ctx, _cache) => {
        const _component_uni_swiper_dot = resolveEasycom(vue.resolveDynamicComponent("uni-swiper-dot"), __easycom_0);
        const _component_uni_th = resolveEasycom(vue.resolveDynamicComponent("uni-th"), __easycom_1);
        const _component_uni_tr = resolveEasycom(vue.resolveDynamicComponent("uni-tr"), __easycom_2);
        const _component_uni_td = resolveEasycom(vue.resolveDynamicComponent("uni-td"), __easycom_3);
        const _component_uni_table = resolveEasycom(vue.resolveDynamicComponent("uni-table"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "container" }, [
              vue.createVNode(_component_uni_swiper_dot, {
                class: "uni-swiper-dot-box",
                dotsStyles: dotStyle,
                info,
                onClickItem: clickItem,
                current: vue.unref(current),
                mode: "round",
                field: "content"
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("swiper", {
                    class: "swiper-box",
                    autoplay: "true",
                    circular: "true",
                    onChange: change,
                    current: vue.unref(swiperDotIndex)
                  }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(info, (item, index) => {
                        return vue.createElementVNode(
                          "swiper-item",
                          {
                            class: "swiper-item",
                            style: vue.normalizeStyle({ backgroundImage: `url(${item.url})` }),
                            key: index
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              { style: { "color": "#000000", "font-size": "32px" } },
                              vue.toDisplayString(item.content),
                              1
                              /* TEXT */
                            )
                          ],
                          4
                          /* STYLE */
                        );
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ], 40, ["current"]),
                  vue.createElementVNode("view", { class: "swiperOtherBox" }, [
                    (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(otherBoxList, (item) => {
                        return vue.createElementVNode("view", { class: "OtherBoxItem" }, [
                          vue.createElementVNode("image", {
                            src: item.imgUrl,
                            mode: ""
                          }, null, 8, ["src"]),
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(item.name),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["current"])
            ]),
            vue.createElementVNode("view", { class: "main" }, [
              vue.createElementVNode("view", { class: "active" }, [
                vue.createElementVNode("view", { class: "activeTitle" }, [
                  vue.createElementVNode("view", { class: "titleLeft" }, [
                    vue.createElementVNode("image", { src: _imports_0 }),
                    vue.createElementVNode("text", null, "施工动态")
                  ]),
                  vue.createElementVNode("view", { class: "titleRight" }, [
                    vue.createElementVNode("text", null, "管理"),
                    vue.createElementVNode("image", { src: _imports_1 })
                  ])
                ]),
                vue.createElementVNode("view", { class: "activeContent" }, [
                  vue.createVNode(_component_uni_table, {
                    stripe: "",
                    emptyText: "暂无更多数据"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createCommentVNode(" 表头行 "),
                      vue.createVNode(_component_uni_tr, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uni_th, {
                            width: "70",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("姓名")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_th, {
                            width: "200",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("施工地点")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_th, {
                            width: "70",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("种类")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_th, {
                            width: "60",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("开工日期")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_th, {
                            width: "100",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("预计完成日期")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_th, {
                            width: "40",
                            align: "center"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("进度")
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      vue.createCommentVNode(" 表格数据行 "),
                      vue.createVNode(_component_uni_tr, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("给对大萨")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("成都市新都区新都小区12栋1单元1201")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("水木施工")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("2023.3.3")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("2023.4.4")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          vue.createVNode(_component_uni_td, { align: "center" }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("80%")
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-07e72d3c"], ["__file", "F:/Code/HbuilderX/ZhiJia/pages/home/home.vue"]]);
  const _sfc_main$3 = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", null, "录入")
    ]);
  }
  const PagesAddAdd = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "F:/Code/HbuilderX/ZhiJia/pages/add/add.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", null, "服务")
    ]);
  }
  const PagesServiceService = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "F:/Code/HbuilderX/ZhiJia/pages/service/service.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", null, "个人中心")
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "F:/Code/HbuilderX/ZhiJia/pages/user/user.vue"]]);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/add/add", PagesAddAdd);
  __definePage("pages/service/service", PagesServiceService);
  __definePage("pages/user/user", PagesUserUser);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "F:/Code/HbuilderX/ZhiJia/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
