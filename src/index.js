import "./style.scss";

const { createElement, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { BlockControls, PlainText, MediaUpload, MediaPlaceholder } = wp.editor;
const { Toolbar, IconButton } = wp.components;

const ALLOWED_MEDIA_TYPES = ["image"];



registerBlockType("wp-js-plugin-starter/hello-world", {
  title: "Meme",
  description: "Pick an image and some text.",
  icon: "smiley",
  category: "common",
  attributes: {
    memeTextTop: {
      type: "string"
    },
    imageUrl: {
      type: "string",
      default: "",
    },
    id: {
      type: "number"
    }
  },

  edit: function({ attributes, setAttributes }) {
    const onSelectImage = media => {
      if (!media || !media.url) {
        setAttributes({ imageUrl: undefined, id: undefined });
        return;
      }
      setAttributes({ imageUrl: media.url, id: media.id });
    };

    const memeDivClass = 'meme-div' + 
      ( '' == attributes.imageUrl ? ' no-image-selected' : '' );

    return (
      <Fragment>
        <Fragment>
          <BlockControls>
            <Toolbar>
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                  <IconButton
                    className="components-toolbar__control"
                    value={attributes.id}
                    label={"Edit image"}
                    icon="edit"
                    onClick={open}
                  />
                )}
              />
            </Toolbar>
          </BlockControls>
        </Fragment>
        <div className={ memeDivClass }>
          <PlainText
            className="top-text"
            value={attributes.memeTextTop}
            onChange={memeTextTop => setAttributes({ memeTextTop })}
            placeholder={"Write something funny..."}
          />
          { attributes.imageUrl && (
            <img
              className="meme-image"
              src={attributes.imageUrl}
              />
          ) }
          { '' == attributes.imageUrl && (
					<MediaPlaceholder
						icon=''
						className=""
						labels={ {
							title: '',
							name: '',
						} }
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ ALLOWED_MEDIA_TYPES }
					/>
          ) }
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    return (
      <div className="meme-div">
        <img
          className="meme-image"
          src={attributes.imageUrl}
        />
        <div className="top-text">{attributes.memeTextTop}</div>
      </div>
    );
  }
});
