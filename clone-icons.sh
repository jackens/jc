#!/bin/sh

ICONS_IN=./_icons-in

for REPO in \
  astrit/css.gg \
  atisawd/boxicons \
  bytedance/IconPark \
  danielbruce/entypo \
  erikflowers/weather-icons \
  evil-icons/evil-icons \
  feathericons/feather \
  fontello/brandico.font \
  fontello/fontelico.font \
  framework7io/framework7-icons \
  geakstr/entypo-icons \
  github/octicons \
  grommet/grommet-icons \
  icons8/flat-color-icons \
  ionic-team/ionicons \
  kenangundogan/fontisto \
  lucaburgio/iconoir \
  mapbox/maki \
  microsoft/fluentui-system-icons \
  microsoft/vscode-codicons \
  mikolajdobrucki/ikonate \
  primer/octicons \
  Remix-Design/RemixIcon \
  stephenhutchings/typicons.font \
  tabler/tabler-icons \
  tailwindlabs/heroicons \
  teenyicons/teenyicons \
  twbs/icons \
  vaadin/vaadin-icons \
  zurb/foundation-icon-fonts
do
  mkdir -p "$ICONS_IN/$REPO"
  git clone "https://github.com/$REPO.git" "$ICONS_IN/$REPO"
done
