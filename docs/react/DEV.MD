
# INSTALL

    npx roderic
        # default directry is roderic-project
    npx roderic directory
    npx roderic .

# DEV

    mkdir roderic_development
    cd roderic_development
    git clone git@github.com:stopsopa/roderic.git lib-npm-link
    cp lib-npm-link/dev/* .    
    (cd lib-npm-link && yarn && npm link)
    roderic
    (cd roderic-project/react && yarn)
    (cd roderic-project/react && npm link roderic)    
    
Now last command ...

    ls -la roderic-project/react/node_modules/ | grep roderic
    
... should return (roderic lib should be symlink in node_modules):
    
    lrwxr-xr-x    1 sd  staff      58  2 Aug 12:44 roderic -> ../../../../../../../../usr/local/lib/node_modules/roderic
        
    
And finally you can just manipulate both directories (lib-npm-link & roderic-project).
I you like save changes of lib-npm-link then run:

    make u
    
I you want to safe changes from roderic-project then run:

    make b 
    
then commit changes in lib-npm-link and run again   

    make u

To test installation process and if everything works after run:

    make t     
    
There is another version of update script. Use it when you already pushed changes to git:

    (cd lib-npm-link/ && make update-force) 

### summary

* *test.sh* - use when you want to test installation process (might be unsafe - it might override changes in unsafed roderic-project directory)
* *back.sh* - use when you want to include to library changes from temporary installation (safe)

## running tests

Execute in first terminal (main dev instance of roderic server):
    
    cd roderic-project/react
    sudo yarn dev
    
Execute in second terminal (it's local node.js api server): 

    cd roderic-project/puppeteer
    make ts
    
Execute in third terminal (puppeteer tests, local or in docker): 

    cd roderic-project/puppeteer
    /bin/bash test.sh
    # or
    /bin/bash test.sh --target docssh
    # or
    /bin/bash test.sh --target dochost
        
    
    
