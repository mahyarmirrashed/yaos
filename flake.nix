{
  description = "Flake for github:mahyarmirrashed/yaos";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs-slim_22
            pnpm
          ];
          shellHook = ''
            export PATH="$PATH:$(pnpm bin)"
          '';
        };
      }
    );
}
