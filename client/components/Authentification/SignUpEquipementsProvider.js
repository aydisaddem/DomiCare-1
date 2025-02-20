import React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IPAdress } from "@env";
import * as Google from "expo-google-app-auth";
import {
    Box,
    Heading,
    VStack,
    Button,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    ScrollView,
    InputGroup,
    InputLeftAddon,
    useDisclose,
    Modal,
    CheckIcon,
    Divider,
    Image,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext.js";
import { FontAwesome } from "@expo/vector-icons";

function SignUp() {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const handleGoogleSignup = () => {
        const config = {
            iosClientId:
                "477279958073-g64kmtrrh5ut8hbv0ctbggiumiklpgid.apps.googleusercontent.com",
            androidClientId:
                "477279958073-ld24gig53t7i6lo9q4p42ga2ecsg6qvl.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        };
        Google.logInAsync(config)
            .then((result) => {
                const { type, user } = result;
                if (type == "success") {
                    navigation.navigate("EPSignUpGoogle", {
                        email: user.email,
                        firstName: user.givenName,
                        lastName: user.familyName,
                        picture: user.photoUrl,
                    });
                } else {
                    console.log("Google signup was cancelled");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const persistLogin = (credentials) => {
        AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const { isOpen, onOpen, onClose } = useDisclose();
    const validate = () => {
        let validation = true;
        let passwordValid =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const expression =
            /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        let errors = {};
        if (formData.password === undefined) {
            errors.password = "Password is required";
            validation = false;
        } else if (
            formData.password !== "undefined" &&
            formData.confirmPassword !== "undefined"
        ) {
            if (!passwordValid.test(String(formData.password))) {
                errors.password =
                    "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
                validation = false;
            } else if (
                passwordValid.test(String(formData.password)) &&
                formData.password != formData.confirmPassword
            ) {
                validation = false;
                errors["password"] = "Passwords don't match.";
            }
        }
        if (formData.email === undefined) {
            errors.email = "Email is required";
            validation = false;
        } else if (
            formData.email &&
            !expression.test(String(formData.email).toLowerCase())
        ) {
            errors.email = "Invalid Email";
            validation = false;
        }
        if (formData.firstName === undefined) {
            errors.firstName = "First name is required";
            validation = false;
        }
        if (formData.lastName === undefined) {
            errors.lastName = "Last name is required";
            validation = false;
        }

        if (formData.phoneNumber === undefined) {
            errors.phoneNumber = "Phone Number is required";
            validation = false;
        } else if (!typeof formData.phoneNumber === "number") {
            errors.phoneNumber = "Invalid Phone Number ";
            validation = false;
        }
        setErrors(errors);
        return validation;
    };

    const post = () => {
        axios
            .post(`http://192.168.1.5:3000/auth/EPSignUp`, { formData })
            .then((response) => {
                let errors = {};
                const data = response.data;
                if (response.data === "email address already exists") {
                    errors["email"] = "email address already exists";
                    setErrors(errors);
                } else if (response.data === "Username already exists") {
                    errors["userName"] = "Username already exists";
                    setErrors(errors);
                } else {
                    persistLogin({ userData: data });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = () => {
        if (validate()) {
            post();
        } else console.log("Validation Failed");
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Content>
                    <Modal.Header fontSize="4xl" fontWeight="bold">
                        Congratulation
                    </Modal.Header>
                    <Modal.Body>you have successfully registered</Modal.Body>
                </Modal.Content>
            </Modal>

            <Image
                source={require("../../assets/categories/logo_small.png")}
                style={{
                    width: 300,
                    height: 60,
                    position: "absolute",
                    top: 80,
                    left: 15,
                }}
                alt="logo"
            />

            <Box safeArea p="2" w="120%" maxW="300" py="8" marginTop={79}>
                <Heading
                    size="lg"
                    color="coolGray.800"
                    _dark={{
                        color: "warmGray.50",
                    }}
                    fontWeight="semibold"
                >
                    Welcome
                </Heading>
                <Heading
                    mt="1"
                    color="coolGray.600"
                    _dark={{
                        color: "warmGray.200",
                    }}
                    fontWeight="medium"
                    size="xs"
                >
                    Sign up to continue!
                </Heading>
                <Divider my={2} mt={8} />
                <Box p={2} px="4" w="80%" maxW="300" ml={8}>
                    <FontAwesome.Button
                        name="google"
                        backgroundColor="#f39a6e"
                        onPress={handleGoogleSignup}
                    >
                        Signup with Google
                    </FontAwesome.Button>
                </Box>
                <Divider my={2} mb={8} />
                <VStack space={3} mt="5">
                    <FormControl isRequired isInvalid={"firstName" in errors}>
                        <FormControl.Label>First name</FormControl.Label>
                        <Input
                            onChangeText={(value) =>
                                setData({ ...formData, firstName: value })
                            }
                        />
                        {"firstName" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.firstName}
                            </FormControl.ErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"lastName" in errors}>
                        <FormControl.Label>Last name</FormControl.Label>
                        <Input
                            onChangeText={(value) =>
                                setData({ ...formData, lastName: value })
                            }
                        />
                        {"lastName" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.lastName}
                            </FormControl.ErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"phoneNumber" in errors}>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <InputGroup
                            w={{
                                base: "100%",
                                lg: "100%",
                            }}
                        >
                            <InputLeftAddon
                                children={"+216"}
                                w={{
                                    base: "20%",
                                    lg: "100%",
                                }}
                            />
                            <Input
                                w={{
                                    base: "80%",
                                    lg: "100%",
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, phoneNumber: value })
                                }
                            />
                        </InputGroup>

                        {"phoneNumber" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.phoneNumber}
                            </FormControl.ErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"email" in errors}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            onChangeText={(value) =>
                                setData({ ...formData, email: value })
                            }
                        />
                        {"email" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.email}
                            </FormControl.ErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"password" in errors}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(value) =>
                                setData({ ...formData, password: value })
                            }
                        />

                        {"password" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.password}
                            </FormControl.ErrorMessage>
                        ) : (
                            <FormControl.HelperText _text={{ fontSize: "xs" }}>
                                Must Contain 8 Characters, One Uppercase, One
                                Lowercase, One Number and one special case
                                Character
                            </FormControl.HelperText>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={"password" in errors}>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(value) =>
                                setData({ ...formData, confirmPassword: value })
                            }
                        />
                        {"password" in errors ? (
                            <FormControl.ErrorMessage>
                                {errors.password}
                            </FormControl.ErrorMessage>
                        ) : (
                            ""
                        )}
                    </FormControl>

                    <Button onPress={onSubmit} mt="5" colorScheme="teal">
                        Submit
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    );
}

export default function () {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <SignUp />
            </Center>
        </NativeBaseProvider>
    );
}
