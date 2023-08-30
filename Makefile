help:
	@echo "Builds various Melange artifacts"
	@echo
	@echo "Targets:"
	@echo
	@echo "  distro        - Builds all distributable files."
	@echo "  documentation - Builds docs only"

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

DISTRO_CSS=$(DIST_DIR)/melange.css
DISTRO_MINIFIED_CSS=$(DIST_DIR)/melange.min.css

#dm | ns | l/m | NAME
#Y    Y     Y  | melange.css
#
#N    Y     Y  | melange-no_dark_mode.css
#Y    Y     N  | melange-breakpoint_ns_only.css
#N    Y     N  | melange-no_dark_mode-breakpoint_ns_only.css
#Y    N     N  | melange-no_breakpoints.css
#N    N     N  | melange-no_dark_mode-no_breakpoints.css

DISTRO_NO_DARK_MODE_CSS=$(DIST_DIR)/melange-no_dark_mode.css
DISTRO_NO_DARK_MODE_MINIFIED_CSS=$(DIST_DIR)/melange-no_dark_mode.min.css

DISTRO_BREAKPOINT_NS_ONLY_CSS=$(DIST_DIR)/melange-breakpoint_ns_only.css
DISTRO_BREAKPOINT_NS_ONLY_MINIFIED_CSS=$(DIST_DIR)/melange-breakpoint_ns_only.min.css

DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_CSS=$(DIST_DIR)/melange-no_dark_mode-breakpoint_ns_only.css
DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_MINIFIED_CSS=$(DIST_DIR)/melange-no_dark_mode-breakpoint_ns_only.min.css

DISTRO_NO_BREAKPOINTS_CSS=$(DIST_DIR)/melange-no_breakpoints.css
DISTRO_NO_BREAKPOINTS_MINIFIED_CSS=$(DIST_DIR)/melange-no_breakpoints.min.css

DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_CSS=$(DIST_DIR)/melange-no_dark_mode-no_breakpoints.css
DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_MINIFIED_CSS=$(DIST_DIR)/melange-no_dark_mode-no_breakpoints.min.css

DISTRO_FILES=$(DISTRO_MINIFIED_CSS) $(DISTRO_NO_DARK_MODE_MINIFIED_CSS) $(DISTRO_BREAKPOINT_NS_ONLY_MINIFIED_CSS) $(DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_MINIFIED_CSS) $(DISTRO_NO_BREAKPOINTS_MINIFIED_CSS) $(DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_MINIFIED_CSS)

METADATA=$(DIST_DIR)/melange-metadata.json

## Docs

DOCS_DIR=docs

# Rules
distro: $(DISTRO_FILES) $(METADATA) documentation
.PHONY: distro

$(DIST_DIR):
	@echo "Creating $(@)"
	@mkdir -p $(@)

$(DISTRO_MINIFIED_CSS): $(DISTRO_CSS)
	@echo "Minifying $(DISTRO_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f melange.css ; cd ..

$(DISTRO_NO_DARK_MODE_MINIFIED_CSS): $(DISTRO_NO_DARK_MODE_CSS)
	@echo "Minifying $(DISTRO_NO_DARK_MODE_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f /melange-no_dark_mode.css ; cd ..

$(DISTRO_BREAKPOINT_NS_ONLY_MINIFIED_CSS): $(DISTRO_BREAKPOINT_NS_ONLY_CSS)
	@echo "Minifying $(DISTRO_BREAKPOINT_NS_ONLY_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f /melange-breakpoint_ns_only.css ; cd ..

$(DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_MINIFIED_CSS): $(DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_CSS)
	@echo "Minifying $(DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f /melange-no_dark_mode-breakpoint_ns_only.css ; cd ..

$(DISTRO_NO_BREAKPOINTS_MINIFIED_CSS): $(DISTRO_NO_BREAKPOINTS_CSS)
	@echo "Minifying $(DISTRO_NO_BREAKPOINTS_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f /melange-no_breakpoints.css ; cd ..

$(DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_MINIFIED_CSS): $(DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_CSS)
	@echo "Minifying $(DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_CSS)"
	@cd $(DIST_DIR) && npx css-minify -o . -f /melange-no_dark_mode-no_breakpoints.css ; cd ..

$(DISTRO_CSS) $(METADATA): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --meta-data $(METADATA)

$(DISTRO_NO_DARK_MODE_CSS) : $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --no-media-queries="dm"

$(DISTRO_BREAKPOINT_NS_ONLY_CSS) : $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --no-media-queries="l,m"

$(DISTRO_NO_DARK_MODE_BREAKPOINT_NS_ONLY_CSS) : $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --no-media-queries="dm,l,m"

$(DISTRO_NO_BREAKPOINTS_CSS) : $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --no-media-queries="ns,l,m"

$(DISTRO_NO_DARK_MODE_NO_BREAKPOINTS_CSS) : $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(@) --no-media-queries="dm,ns,l,m"

$(DOCS_DIR):
	@mkdir -p $(DOCS_DIR)

documentation: $(DOCS_DIR) $(SRC_FILES) $(SRC_HTML_FILES)
	@node $(SRC_JS_DIR)/cli/melange.js website --templates $(SRC_HTML_DIR)/ --dir $(DOCS_DIR)/ --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli/melange.js reference-docs --templates $(SRC_HTML_DIR)/reference --dir $(DOCS_DIR)/reference --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/melange.css
	@node $(SRC_JS_DIR)/cli/melange.js css --css $(DOCS_DIR)/reference/melange.css
	@cp $(SRC_HTML_DIR)/*.png $(DOCS_DIR)
	@cp $(SRC_DIR)/CNAME $(DOCS_DIR)
.PHONY: documentation

clean:
	@rm -rf $(DISTRO_FILES)
	@rm -rf $(METADATA)
	@rm -rf $(DOCS_DIR)/*.html
	@rm -rf $(DOCS_DIR)/*.css
	@rm -rf $(DOCS_DIR)/*.png
	@rm -rf $(DOCS_DIR)/reference
.PHONY: clean

debug:
	@echo ${SRC_CLI}

.PHONY: debug
