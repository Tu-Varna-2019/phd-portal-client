###############
# TARGETS
###############

.PHONY: all clean run test
all: clean run test

run:
	pnpm run dev --experimental-https

test:
	pnpm run test

clean:
	rm -rf .next


