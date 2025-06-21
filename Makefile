###############
# TARGETS
###############

.PHONY: all clean run test install
all: clean run test

run:
	pnpm run dev --experimental-https

test:
	pnpm test

install:
	pnpm i

clean:
	rm -rf .next
