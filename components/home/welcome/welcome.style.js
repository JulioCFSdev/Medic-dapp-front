import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContainer: {
    flex: 1,
    padding: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 35
  },
  fieldContainer: {
    marginBottom: 20,
    marginRight: "65%"
  },
  Filecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Filebutton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  FilebuttonText: {
    color: 'white',
  },
  fileInfo: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#edf0ef',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 42,
    marginLeft: 230,
    marginTop: -20
  },
  button2: {
    backgroundColor: '#edf0ef',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 42,
    marginLeft: 280,
    marginTop: -30
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  buttonText: {
    color: 'white',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginLeft: 150,
    marginRight: 150,
    marginBottom: 10,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    height: 80,
    textAlign: "center",
    justifyContent: "center",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    backgroundColor: 'gray',
    color: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 40
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 120,
    height: 50,
    marginRight: 150,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  dropdown: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 40
  },

  selectedValue: {
    marginTop: 20,
  },

  ExamBtn: {
    width: 120,
    height: 50,
    marginLeft: "52%",
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: -50,
  },

  ExamBtn2: {
    width: 120,
    height: 50,
    marginLeft: "72%",
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  ConBtn2: {
    width: 120,
    height: 50,
    marginLeft: 238,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    marginTop: 20
  },

  FileBtn2: {
    width: 180,
    height: 50,
    marginLeft: 40,
    backgroundColor: "gray",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -20
  },

  searchBtn2: {
    width: 120,
    height: 50,
    marginLeft: 150,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -58.9
  },

  image: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50
  },

  profile: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },

  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  input: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 8,
      margin: 10,
      borderRadius: 5,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain', // Você pode ajustar isso conforme necessário
      alignSelf: 'center', // Alinhar a imagem ao centro horizontalmente
      marginTop: 10, // Espaçamento acima da imagem
    },
});

export default styles;
