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
#SRC_CLI_FILES=$(shell find $(SRC_JS_DIR)/cli -name '*.js')
SRC_CLI_INTERNAL_FILES=$(shell find $(SRC_JS_DIR)/cli-internal -name '*.js')
SRC_FILES=$(SRC_LIB_FILES) $(SRC_META_THEME_FILES) $(SRC_CLI_FILES) $(SRC_CLI_INTERNAL_FILES)
SRC_HTML_DIR=$(SRC_DIR)/html
SRC_HTML_FILES=$(shell find $(SRC_HTML_DIR) -name '*.html')
# Outputs
#
## Distro
DIST_DIR=melange-css

DISTRO_CSS=$(DIST_DIR)/melange.css
DISTRO_MINIFIED_CSS=$(DIST_DIR)/melange.min.css

# Following files
# melange-plus.css      -  breakpoints, dark mode, high contrast
# melange.css           -  breakpoints
# melange-thin.css      -  default only
# melange-plus.min.css  -  breakpoints, dark mode, high contrast, minified
# melange.min.css       -  breakpoints, minified
# melange-thin.min.css  -  default only, minified
# melange-ns.css        -  ns breakpoints
# melange-l.css         -  l breakpoints
# melange-m.css         -  m breakpoints
# melange-dm.css        -  dark mode
# melange-hc.css        -  high contrast


# Plus-sized - include everything
DISTRO_PLUS_CSS=$(DIST_DIR)/melange-plus.css
DISTRO_PLUS_MINIFIED_CSS=$(DIST_DIR)/melange-plus.min.css

$(DISTRO_PLUS_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="ALL"


# Default - include only breakpoints
DISTRO_DEFAULT_CSS=$(DIST_DIR)/melange.css
DISTRO_DEFAULT_MINIFIED_CSS=$(DIST_DIR)/melange.min.css

$(DISTRO_DEFAULT_CSS) $(METADATA): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(DISTRO_DEFAULT_CSS) --meta-data $(METADATA) --only-media-queries="DEFAULT,ns,m,l"

# Thin - default breakpoints only
DISTRO_THIN_CSS=$(DIST_DIR)/melange-thin.css
DISTRO_THIN_MINIFIED_CSS=$(DIST_DIR)/melange-thin.min.css

$(DISTRO_THIN_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="DEFAULT"

# NS - ns- breakpoint only
DISTRO_NS_CSS=$(DIST_DIR)/melange-not-small-breakpoint.css
DISTRO_NS_MINIFIED_CSS=$(DIST_DIR)/melange-not-small-breakpoint.min.css

$(DISTRO_NS_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="ns" --no-variables --no-reset

# M - m- breakpoint only
DISTRO_M_CSS=$(DIST_DIR)/melange-medium-breakpoint.css
DISTRO_M_MINIFIED_CSS=$(DIST_DIR)/melange-medium-breakpoint.min.css

$(DISTRO_M_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="m" --no-variables --no-reset

# L - l- breakpoint only
DISTRO_L_CSS=$(DIST_DIR)/melange-large-breakpoint.css
DISTRO_L_MINIFIED_CSS=$(DIST_DIR)/melange-large-breakpoint.min.css

$(DISTRO_L_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="l" --no-variables --no-reset

# DM - Dark mode breakpoint only
DISTRO_DM_CSS=$(DIST_DIR)/melange-dark-mode.css
DISTRO_DM_MINIFIED_CSS=$(DIST_DIR)/melange-dark-mode.min.css

$(DISTRO_DM_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="dm" --no-variables --no-reset

# HC - High contrast breakpoint only
DISTRO_HC_CSS=$(DIST_DIR)/melange-high-contrast.css
DISTRO_HC_MINIFIED_CSS=$(DIST_DIR)/melange-high-contrast.min.css

$(DISTRO_HC_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(@) --only-media-queries="hc" --no-variables --no-reset

DISTRO_FILES=$(DISTRO_PLUS_CSS)    \
						 $(DISTRO_DEFAULT_CSS) \
						 $(DISTRO_THIN_CSS)    \
						 $(DISTRO_NS_CSS)      \
						 $(DISTRO_M_CSS)       \
						 $(DISTRO_L_CSS)       \
						 $(DISTRO_DM_CSS)      \
						 $(DISTRO_HC_CSS)
DISTRO_MINIFIED_FILES=$(DISTRO_PLUS_MINIFIED_CSS)    \
										 $(DISTRO_DEFAULT_MINIFIED_CSS) \
										 $(DISTRO_THIN_MINIFIED_CSS)    \
										 $(DISTRO_NS_MINIFIED_CSS)      \
										 $(DISTRO_M_MINIFIED_CSS)       \
										 $(DISTRO_L_MINIFIED_CSS)       \
										 $(DISTRO_DM_MINIFIED_CSS)      \
										 $(DISTRO_HC_MINIFIED_CSS)

METADATA=$(DIST_DIR)/melange-metadata.json

## Docs

DOCS_DIR=docs

# Rules
distro: $(DISTRO_FILES) $(DISTRO_MINIFIED_FILES) $(METADATA) documentation
.PHONY: distro

$(DIST_DIR):
	@echo "Creating $(@)"
	@mkdir -p $(@)

# Minify any .css file
$(DIST_DIR)/%.min.css: $(DIST_DIR)/%.css
	@echo "Minifying $(<)"
	@npx css-minify -o . -f $(<) -o $(DIST_DIR)

$(DOCS_DIR):
	@mkdir -p $(DOCS_DIR)
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(DOCS_DIR)/melange.css

documentation: $(DOCS_DIR) $(SRC_FILES) $(SRC_HTML_FILES)
	@node $(SRC_JS_DIR)/cli-internal/melange.js website --templates $(SRC_HTML_DIR)/ --dir $(DOCS_DIR)/ --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli-internal/melange.js reference-docs --templates $(SRC_HTML_DIR)/reference --dir $(DOCS_DIR)/reference --force --packagejson $(CLI_ROOT)/package.json
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(DOCS_DIR)/melange.css
	@node $(SRC_JS_DIR)/cli-internal/melange.js css --css $(DOCS_DIR)/reference/melange.css
	@cp $(SRC_HTML_DIR)/*.png $(DOCS_DIR)
	@cp $(SRC_DIR)/CNAME $(DOCS_DIR)
.PHONY: documentation

clean:
	@rm -rf $(DISTRO_FILES)
	@rm -rf $(DISTRO_MINIFIED_FILES)
	@rm -rf $(METADATA)
	@rm -rf $(DOCS_DIR)/*.html
	@rm -rf $(DOCS_DIR)/*.css
	@rm -rf $(DOCS_DIR)/*.png
	@rm -rf $(DOCS_DIR)/reference
.PHONY: clean


debug:
	@echo $(DISTRO_FILES)
.PHONY: debug
