import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../components/Home.js";
import { NotificationsScreen } from "../components/Notifications.js";
import {
    ProfileServiceSeeker,
    ProfileServiceProvider,
    ProfileEquipementsProvider,
} from "../components/Profile";
import {
    EditProfileSS,
    EditProfileSP,
    EditProfileEP,
} from "../components/EditProfiles";
import Report from "../components/report.js";
import ForumPost from "../components/ForumPost.js";
import Forum2 from "../components/forum2.js";
import Equipmentsfetch from "../components/Equipementsfetch.js";
import EquipementItem from "../components/EquipementItem.js";
import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";

import { Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QAStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import axios from "axios";
import ServiceProvidersProfiles from "../components/Posts/ServiceProvidersProfiles.js";
import ServiceSeekerAddPost from "../components/Posts/ServiceSeekerAddPost.js";
import ServiceSeekersPosts from "../components/Posts/ServiceSeekersPosts.js";
import ReceivedRequests from "../components/Transactions/ServiceProvidersReceivedRequests.js";
import ServiceProvidersSendedOffers from "../components/Transactions/ServiceProvidersSendedOffers.js";
import ServiceSeekerReceivedOffers from "../components/Transactions/ServiceSeekerReceivedOffers.js";
import ServiceSeekerSendARequest from "../components/Transactions/ServiceSeekerSendARequest.js";
import ServiceSeekerSendedRequests from "../components/Transactions/ServiceSeekerSendedRequests.js";
import {Paiment} from "../components/paiment.js"


const MainTabScreen = () => {
    const navigation = useNavigation();

    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;

    const [Notif, setNotif] = React.useState(0);

    React.useEffect(() => { const interval = setInterval(() => {      axios
        .get(
            `http://192.168.1.5:3000/Notifications/Fetch/${userData._id}`
        )
        .then((res) => {
            const NotSeen = res.data.filter(
                (item) => item.seen === false
            );
            const NotifN = NotSeen.length;
            setNotif(NotifN);
        }); }, 1000); return () => clearInterval(interval); }, [])
    
    return (
        <Tab.Navigator barStyle={{ backgroundColor: "#008080" }}>
            <Tab.Screen
                name="Home Screen"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile Screen"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Q/A"
                component={QAStackScreen}
                options={{
                    tabBarLabel: "Forum",
                    tabBarColor: "#008080",
                    tabBarIcon: ({ color }) => (
                        <Icon name="chatbubbles" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications Screen"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarBadge: Notif>0 ?  `${Notif}` : null,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="ios-notifications"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#008080",
                    shadowColor: "#008080",
                    elevation: 0,
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => {
                                    navigation.navigate("Profile Screen");
                                }}
                            >
                                <Avatar.Image
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <HomeStack.Screen
                name="Equipements List"
                component={Equipmentsfetch}
                options={{
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            backgroundColor="#008080"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                }}
            />
              <HomeStack.Screen
                name="Paiment"
                component={Paiment}
                options={{
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            backgroundColor="#008080"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                }}
            />
            <HomeStack.Screen
                name="Equipement"
                component={EquipementItem}
                options={{
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={25}
                            backgroundColor="#008080"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                }}
            />

            <HomeStack.Screen
                name="Forum2"
                component={Forum2}
                options={{
                    title: "Forum",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => {
                                    navigation.navigate("Profile Screen");
                                }}
                            >
                                <Avatar.Image
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <HomeStack.Screen
                name="ForumPost"
                component={ForumPost}
                options={{
                    title: "Post",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                      
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => {
                                    navigation.navigate("Profile Screen");
                                }}
                            >
                                <Avatar.Image
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />

            <HomeStack.Screen
                name="Report"
                component={Report}
                options={{
                    title: "Report",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                   
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => {
                                    navigation.navigate("Profile Screen");
                                }}
                            >
                                <Avatar.Image
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />

            <HomeStack.Screen
                name="Home Care"
                component={ServiceProvidersProfiles}
            />
            <HomeStack.Screen
                name="ServiceSeekerAddPost"
                component={ServiceSeekerAddPost}
            />

            <HomeStack.Screen
                name="ServiceSeekersPosts"
                component={ServiceSeekersPosts}
            />
            <HomeStack.Screen
                name="ServiceProvidersReceivedRequests"
                component={ReceivedRequests}
            />
            <HomeStack.Screen
                name="ServiceProvidersSendedOffers"
                component={ServiceProvidersSendedOffers}
            />
            <HomeStack.Screen
                name="ServiceSeekerReceivedOffers"
                component={ServiceSeekerReceivedOffers}
            />
            <HomeStack.Screen
                name="ServiceSeekerSendARequest"
                component={ServiceSeekerSendARequest}
            />
            <HomeStack.Screen
                name="ServiceSeekerSendedRequests"
                component={ServiceSeekerSendedRequests}
            />
        </HomeStack.Navigator>
    );
};

const NotificationStackScreen = ({ navigation }) => (
    <NotificationStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#008080",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    >
        <NotificationStack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#008080"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
        />
    </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userType = storedCredentials.userData.type;
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#008080",
                    shadowColor: "#008080", // iOS
                    elevation: 0, // Android
                },
                headerTintColor: "#008080",
            }}
        >
            {userType === "serviceSeeker" ? (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileServiceSeeker}
                    options={{
                        title: "Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            ) : userType === "serviceProvider" ? (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileServiceProvider}
                    options={{
                        title: "Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            ) : (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileEquipementsProvider}
                    options={{
                        title: "",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            )}

            {userType === "serviceSeeker" ? (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileSS}
                />
            ) : userType === "serviceProvider" ? (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileSP}
                />
            ) : (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileEP}
                />
            )}
        </ProfileStack.Navigator>
    );
};
const QAStackScreen = ({ navigation }) => (
    <QAStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#008080",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    >
        <QAStack.Screen
            name="Medical Forum"
            component={Forum2}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#008080"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
        />
        <QAStack.Screen
            name="Post"
            component={ForumPost}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#008080"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
        />
    </QAStack.Navigator>
);
