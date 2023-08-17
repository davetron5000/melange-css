help:
	@echo "Builds various Melange artifacts"
	@echo
	@echo "Targets:"
	@echo
	@echo "  distro     - Builds all distributable files."
	@echo "  local-docs - Builds docs locally"

.PHONY: help

# Inputs
SRC_DIR=melange-cli/src
SRC_JS_DIR=$(SRC_DIR)/js
SRC_LIB_FILES=$(shell find $(SRC_JS_DIR)/lib -name '*.js')
SRC_META_THEME_FILES=$(shell find $(SRC_JS_DIR)/melange -name '*.js')
SRC_CLI_FILES=$(shell find $(SRC_JS_DIR)/cli -name '*.js')
SRC_FILES=$(SRC_LIB_FILES) $(SRC_META_THEME_FILES) $(SRC_CLI_FILES)
SRC_HTML_DIR=$(SRC_DIR)/html
SRC_HTML_FILES=$(shell find $(SRC_HTML_DIR) -name '*.html')
# Outputs
#
## Distro
DIST_DIR=melange-css

MONLITHIC_CSS=$(DIST_DIR)/melange.css
MONLITHIC_MINIFIED_CSS=$(DIST_DIR)/melange.min.css
MONLITHIC_FILES= $(MONLITHIC_CSS) $(MONLITHIC_MINIFIED_CSS)

SPLIT_VARS_ONLY_CSS=$(DIST_DIR)/melange-variables-only.css
SPLIT_STYLES_ONLY_CSS=$(DIST_DIR)/melange-styles-only.css
SPLIT_FILES=$(SPLIT_VARS_ONLY_CSS) $(SPLIT_STYLES_ONLY_CSS)

METADATA=$(DIST_DIR)/melange-metadata.json

## Docs

DOCS_DIR=$(DIST_DIR)/docs

# Rules
distro: $(MONLITHIC_FILES) $(SPLIT_FILES) $(METADATA)
.PHONY: distro

$(DIST_DIR):
	@echo "Creating $(@)"
	@mkdir -p $(@)

$(MONLITHIC_MINIFIED_CSS): $(MONLITHIC_CSS)
	@echo "Minifying $(DIST_DIR)/melange.css"
	@cd $(DIST_DIR) && npx css-minify -o . -f melange.css ; cd ..

$(MONLITHIC_CSS) $(METADATA): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(MONLITHIC_CSS) --meta-data $(METADATA)

$(SPLIT_VARS_ONLY_CSS) $(SPLIT_STYLES_ONLY_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(SPLIT_VARS_ONLY_CSS) and $(SPLIT_STYLES_ONLY_CSS)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(SPLIT_STYLES_ONLY_CSS) --variables $(SPLIT_VARS_ONLY_CSS) --meta-data $(METADATA)

local-docs: $(DOCS_DIR)
.PHONY: local-docs

$(DOCS_DIR): $(SRC_FILES) $(SRC_HTML_FILES)
	@node $(SRC_JS_DIR)/cli/melange.js website --templates $(SRC_HTML_DIR)/ --dir $(DOCS_DIR)/ --force
	@node $(SRC_JS_DIR)/cli/melange.js reference-docs --templates $(SRC_HTML_DIR)/reference --dir $(DOCS_DIR)/reference --force
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/melange.css
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/reference/melange.css
	@cp $(SRC_HTML_DIR)/*.png $(DOCS_DIR)

clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(DOCS_DIR)
.PHONY: clean

debug:
	@echo ${SRC_CLI}

.PHONY: debug
