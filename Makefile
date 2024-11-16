###############
# TARGETS
###############

.PHONY: all clean run test
all: clean run test

run:
	pnpm run dev

test:
	pnpm run test

clean:
	rm -rf .next


