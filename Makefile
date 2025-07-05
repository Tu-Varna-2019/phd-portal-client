###############
# TARGETS
###############

.PHONY: help
help:  ## help target to show available commands with information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) |  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: all clean run test install
all: clean run test

run:
	pnpm run dev --experimental-https

test:
	pnpm test

cypress:
	pnpm run cypress:open


install:
	pnpm i

clean:
	rm -rf .next
