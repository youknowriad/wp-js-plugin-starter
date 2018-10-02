import "./style.scss";

const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;

registerBlockType("wp-js-plugin-starter/hello-world", {
  title: "Hello World",
  description: "Just another Hello World block",
  icon: "admin-site",
  category: "common",

  edit: function() {
		return <div style={{width: '300px', height: '300px', position: 'relative' }} >
				<img
					style={{width: '300px', height: '300px' }}
					src="http://localhost:8888/wp-content/plugins/wp-js-plugin-starter/kitty.jpg"/>
			<div className="top-text">Some Text!</div>
		</div>
  },

  save: function() {
    return <img src="http://localhost:8888/wp-content/plugins/wp-js-plugin-starter/kitty.jpg"/>
  }
});
