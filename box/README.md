#Vagrant Puppet Web-Dev

A simple vagrant setup which installs and configures nGinx and Node.js

Provisioning on the first vagrant up can take a while, (around to 15 minutes on a slower computer)
but after provisioning is complete bootup of the VM should only take a minute or so.

There's two ways to use this in your project, simply clone the repo and add it to your project folder structure
or use it with a git submodule, I haven't used this as a git submodule before but I see no reason for it to not work.

This repo relies on submodules for the puppet modules so after cloning you will have to run `git submodule update` for
it to download all of the dependencies.

##Usage with git submodule

    git submodule add git@github.com:SamStonehouse/vagrant-puppet-webdev.git box
    cd box
    vagrant submodule init
    vagrant submodule update
    vagrant up

##Usage with git clone
	
    git clone git@github.com:SamStonehouse/vagrant-puppet-webdev.git
    cd vagrant-puppet-webdev
    vagrant submodule init
    vagrant submodule update
    vagrant up

