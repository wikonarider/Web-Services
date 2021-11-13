import { makeStyles } from "@material-ui/core/styles";
import { brown } from "@material-ui/core/colors";
const useStylesChat = makeStyles({
  //SEND BTN
  btn: {
    borderRadius: 0,
    textTransfrom: "none",
    color: brown[500],
  },

  /*box wrapper chat*/
  box_messanger_father: {
    display: "flex",
    maxHeight: "935px",
    minHeight: "935px",
    overflow: "hidden",
    backgroundColor: "rgb(231, 238, 238)",
    color: "rgb(165, 42, 42)",
  },
  //---------------------------------------------------------------------box contacts*/
  box_contacts_a: {
    flex: 2,
  },
  /*box-contacts-menu*/
  menu_Contacts_Wrapper: {
    padding: "1%",
    height: "100%",
    border: "none",
    background: "rgb(176, 199, 199)",
  },
  /*input search*/
  searchContact: {},

  /*---------------------------------------------------------------box conversations*/
  box_conversations_b: {
    flex: "5.5",
    height: "90%",
    overflowY: "scroll",
  },
  /*box conversatios wrapper*/
  menu_chating_wrapper: {
    height: "100%",
    padding: "1%",
    color: "rgb(167, 32, 32)",
  },

  /*----------------------------------------------------------------box contacts online-offline*/
  box_contactsStates_c: {
    flex: 2,
  },

  /*box contactsOnline wrapper*/
  menu_contactsOnline_wrapper: {
    padding: "1%",
    height: "100%",
    backgroundColor: "rgb(176, 199, 199)",
  },
  startchat: {
    size: "3em",
  },
});
export default useStylesChat;
