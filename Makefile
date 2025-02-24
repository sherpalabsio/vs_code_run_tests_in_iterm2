.PHONY: help
help:
	@echo 'install_locally   - Install the extension locally'
	@echo 'uninstall_locally - Uninstall the installed extension'

.PHONY: install_locally
install_locally:
	yarn run package --out dist/local.vsix
	code --install-extension dist/local.vsix

.PHONY: uninstall_locally
uninstall_locally:
	code --uninstall-extension undefined_publisher.run-tests-in-iterm2
