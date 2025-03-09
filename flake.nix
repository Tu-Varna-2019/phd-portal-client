{
  description = "PHD portal project";

  inputs = {
    devenv-root = {
      url = "file+file:///dev/null";
      flake = false;
    };
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs @ {
    nixpkgs,
    flake-parts,
    devenv-root,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
      ];
      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        devenv.shells.default = {
          name = "Client ReactJS app";
          languages.javascript = {
            enable = true;
            package = pkgs.nodejs-slim;
            pnpm = {
              enable = true;
              install.enable = true;
            };
          };
          git-hooks.hooks = {
            # Common
            markdownlint.enable = true;
            actionlint = {
              # BUG: Disabled, due to not being able to recognize `include-hidden-files` in github checkout
              enable = false;
              excludes = ["docker-publish.yaml"];
            };
            checkmake.enable = true;
            prettier.enable = true;

            #JS
            # BUG: denofmt disabled, due to a local issue
            denofmt.enable = false;
            denolint.enable = false;
            eslint.enable = true;
          };

          devenv.root = let
            devenvRootFileContent = builtins.readFile devenv-root.outPath;
          in
            pkgs.lib.mkIf (devenvRootFileContent != "") devenvRootFileContent;
        };
      };
    };
}
