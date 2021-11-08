
const backGround = "#1e88e5";

const _style = {
  ////box wrapper chat////////////////////////////////////
  box_messanger_father: {
    display: "flex",
    maxHeight: "935px",
    minHeight:"935px",
    overflow: "hidden",
  },
  //---------------------------------------------------------------------box contacts
  box_contacts_a: {
    flex: "2.0",
  },
  //box-contacts-menu
  menu_contacts_wrapper: {
    padding: "1%",
    height: "100%",
    border: "none",
    background: backGround,
    "&:hover, &.Mui-active": {
      backGround: "#1e88e5",
    },
  },
  //input search
  searchContact: {},

  //---------------------------------------------------------------box conversations
  box_conversations_b: {
    flex: "5.5",
    height: "90%",
    overflowY: "scroll",
    scrollBehavior : "smooth"
  },
  //box conversatios wrapper
  menu_chating_wrapper: {
    height: "100%",
    padding: "1%",
  },

  //----------------------------------------------------------------box contacts online-offline
  box_contactsStates_c: {
    flex: "2.0",
  },

  //box contactsOnline wrapper
  menu_contactsOnline_wrapper: {
    padding: "1%",
    height: "100%",
    background: backGround,
  },
};

export default _style;
