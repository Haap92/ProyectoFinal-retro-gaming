import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const commonStyles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grayScale0,
  },
  container: {
    flex: 1,
    width: "80%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 1,
    width: "100%",
  },
  checkoutContainer: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.grayScale2,
  },
  totalText: {
    fontFamily: "oswaldBold",
    fontSize: 18,
    color: colors.mustard0,
  },
  spinnerContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.grayScale0,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  checkout: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "oswaldRegular",
    color: colors.mustard0,
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.mustard0,
    fontFamily: "oswaldRegular",
    margin: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    color: "white",
    fontFamily: "oswaldRegular",
  },
  linkText: {
    fontSize: 16,
    color: colors.mustard0,
    fontFamily: "oswaldRegular",
  },
  productContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: colors.grayScale1,
  },
  description: {
    marginBottom: 10,
    color: colors.mustard0,
  },
  price: {
    marginBottom: 5,
    color: "white",
  },
  discount: {
    marginBottom: 5,
    color: "white",
  },
  rating: {
    marginBottom: 5,
    color: "white",
  },
  brand: {
    marginBottom: 5,
    color: "white",
  },
  category: {
    marginBottom: 5,
    color: "white",
  },
  addToCart: {
    marginTop: 20,
    backgroundColor: colors.mustard0,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "oswaldRegular",
    margin: 5,
  },
  noLocationContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 200,
    height: 200,
  },
  noPhotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 20,
  },
});
