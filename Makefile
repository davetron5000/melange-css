help:
	@echo "Builds various Melange artifacts"
	@echo
	@echo "Targets:"
	@echo
	@echo "  distro     - Builds all distributable files."
	@echo "  local-docs - Builds docs locally"

.PHONY: help

# Inputs
SRC_LIB_FILES=$(shell find src/js/lib -name '*.js')
SRC_META_THEME_FILES=$(shell find src/js/melange -name '*.js')
SRC_CLI_FILES=$(shell find src/js/cli -name '*.js')
SRC_FILES=$(SRC_LIB_FILES) $(SRC_META_THEME_FILES) $(SRC_CLI_FILES)

# Outputs
#
## Distro
DIST_DIR=dist

MONLITHIC_CSS=$(DIST_DIR)/melange.css
MONLITHIC_MINIFIED_CSS=$(DIST_DIR)/melange.min.css
MONLITHIC_FILES= $(MONLITHIC_CSS) $(MONLITHIC_MINIFIED_CSS)

SPLIT_VARS_ONLY_CSS=$(DIST_DIR)/melange-variables-only.css
SPLIT_STYLES_ONLY_CSS=$(DIST_DIR)/melange-styles-only.css
SPLIT_FILES=$(SPLIT_VARS_ONLY_CSS) $(SPLIT_STYLES_ONLY_CSS)

## Docs

DOCS_DIR=docs

# Rules
distro: $(MONLITHIC_FILES) $(SPLIT_FILES)
.PHONY: distro

$(DIST_DIR):
	@echo "Creating $(@)"
	@mkdir -p $(@)

$(MONLITHIC_MINIFIED_CSS): $(MONLITHIC_CSS)
	@echo "Minifying $(DIST_DIR)/melange.css"
	@npx css-minify -o $(DIST_DIR) -f $(DIST_DIR)/melange.css

$(MONLITHIC_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(@)"
	@node src/js/cli/melange.js css --css $(@)

$(SPLIT_VARS_ONLY_CSS) $(SPLIT_STYLES_ONLY_CSS): $(DIST_DIR) $(SRC_FILES)
	@echo "Building $(SPLIT_VARS_ONLY_CSS) and $(SPLIT_STYLES_ONLY_CSS)"
	@node src/js/cli/melange.js css --css $(SPLIT_STYLES_ONLY_CSS) --variables $(SPLIT_VARS_ONLY_CSS)

local-docs: $(DOCS_DIR)
.PHONY: local-docs

$(DOCS_DIR): $(SRC_FILES)
	@node src/js/cli/melange.js docs --dir $(@) --force
	@node src/js/cli/melange.js css --css $(@)/melange.css

clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(DOCS_DIR)
.PHONY: clean

debug:
	@echo ${SRC_CLI}

.PHONY: debug
