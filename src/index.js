import "./style.scss";

const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { PlainText } = wp.editor;

registerBlockType("wp-js-plugin-starter/hello-world", {
  title: "Hello World",
  description: "Just another Hello World block",
  icon: "admin-site",
  category: "common",
  attributes: {
    memeTextTop: {
      type: "string"
    },
    imageUrl: {
      type: "string",
      default:
        "http://127.0.0.1:8888/wp-content/plugins/wp-js-plugin-starter/kitty.jpg"
    }
  },

  edit: function({ attributes, setAttributes }) {
    return (
      <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <img
          style={{ width: "300px", height: "300px" }}
          src={attributes.imageUrl}
        />
        <PlainText
          className="top-text"
          value={attributes.memeTextTop}
          onChange={memeTextTop => setAttributes({ memeTextTop })}
          placeholder={"Write something funny..."}
        />
      </div>
    );
  },

  save({ attributes }) {
    return (
      <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <img
          style={{ width: "300px", height: "300px" }}
          src={attributes.imageUrl}
        />
        <div className="top-text">{attributes.memeTextTop}</div>
      </div>
    );
  }
});
