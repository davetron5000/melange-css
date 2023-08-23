help:
	@echo "Builds various Melange artifacts"
	@echo
	@echo "Targets:"
	@echo
	@echo "  distro        - Builds all distributable files."
	@echo "  documentation - Builds docs only

.PHONY: help

# Inputs
CLI_ROOT=melange-cli
SRC_DIR=$(CLI_ROOT)/src
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
MONLITHIC_FILES=$(MONLITHIC_CSS) $(MONLITHIC_MINIFIED_CSS)

METADATA=$(DIST_DIR)/melange-metadata.json

## Docs

DOCS_DIR=docs

# Rules
distro: $(MONLITHIC_FILES) $(METADATA) documentation
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

$(DOCS_DIR):
	@mkdir -p $(DOCS_DIR)

documentation: $(DOCS_DIR) $(SRC_FILES) $(SRC_HTML_FILES)
	@node $(SRC_JS_DIR)/cli/melange.js website --templates $(SRC_HTML_DIR)/ --dir $(DOCS_DIR)/ --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli/melange.js reference-docs --templates $(SRC_HTML_DIR)/reference --dir $(DOCS_DIR)/reference --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/melange.css
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/reference/melange.css
	@cp $(SRC_HTML_DIR)/*.png $(DOCS_DIR)
.PHONY: documentation

clean:
	@rm -rf $(MONLITHIC_FILES)
	@rm -rf $(METADATA)
	@rm -rf $(DOCS_DIR)/*.html
	@rm -rf $(DOCS_DIR)/*.css
	@rm -rf $(DOCS_DIR)/*.png
	@rm -rf $(DOCS_DIR)/reference
.PHONY: clean

debug:
	@echo ${SRC_CLI}

.PHONY: debug
