import { UserRole } from "@app/enum/user";

export const adminMenu: Array<MainMenuGroup> = [
  {
    label: "MAIN",
    items: [
      {
        label: "Dashboard",
        route: "/",
        icon: "mage:dashboard-2",
      },

      {
        label: "Accounts",
        route: "/accounts",
        icon: "codicon:organization",
      },
      // {
      //   label: "Admins",
      //   route: "/admins",
      //   icon: "mage:users",
      // },
      {
        label: "Transactions",
        route: "/transactions",
        icon: "hugeicons:invoice-03",
      },
      {
        label: "Tickets",
        route: "/tickets",
        icon: "tdesign:support",
      },
    ]
  }
];

export const accountMenu: Array<MainMenuGroup> = [
  {
    label: "MAIN",
    items: [

      {
        label: "Dashboard",
        route: "/",
        icon: "mage:dashboard-2",
      },
      {
        label: "Transactions",
        route: "/transactions",
        icon: "hugeicons:invoice-03",
      },

    ]
  }, {
    label: "SETTINGS",
    items: [
      {
        label: "API Keys",
        icon: "mdi:key",
        route: "/settings/api-keys",
      }
    ]
  }
];


export const getMenu = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return adminMenu;
    case UserRole.Account:
      return accountMenu;
  }
  return [];
};
