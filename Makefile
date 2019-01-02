u: # update npm and git (generates new tag)
	@/bin/bash update.sh

uf: # update even if there is nothing new committed
	@/bin/bash update.sh force

h: # show any help that is available
	@/bin/bash test.sh --help
	@echo https://github.com/stopsopa/ipromise

t: # just run tests once
	@/bin/bash test.sh

tw: # run tests in watch mode
	@/bin/bash test.sh --watch

twa: # run tests in watchAll mode
	@/bin/bash test.sh --watchAll

c: # run local server to browse github files
	@node server.js --log 15 --dir docs

nt: # test .npmignore
	@npm pack

ct: # travis parameters.json
	@/bin/bash update.sh --travis

cp: # jest parameters.json
	@/bin/bash update.sh --prod

dev: # run also in another terminal "make c" and browser all content through this server
	(cd docs/react && sudo yarn dev)