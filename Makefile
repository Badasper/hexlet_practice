install:
	npm install

lint:
	npm run eslint .

test:
	npm test -- --coverage

watch:
	npm test -- --watchAll

publish:
	npm publish

.PHONY: test
