import React, {useMemo, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    Switch,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import TopBar from '../../components/common/TopBar';
import COLORS from '../../constants/Colors';
import {LinearGradient} from "expo-linear-gradient";

/* -------------------------
   Replace these with your API calls
   ------------------------- */
const wait = (ms = 650) => new Promise(res => setTimeout(res, ms));

async function apiUpdateUsername(username: string) {
    await wait();
    return {ok: true};
}

async function apiUpdateEmail(email: string) {
    await wait();
    return {ok: true};
}

async function apiUpdatePassword(oldP: string, newP: string) {
    await wait();
    return {ok: true};
}

async function apiUpdatePrivacy(privateProfile: boolean) {
    await wait();
    return {ok: true};
}

const BORDER_WIDTH = 1;

const GradientBorder: React.FC<{
    show: boolean;
    radius?: number;
    style?: any;
}> = ({show, radius = 8, style, children}) => {
    if (!show) {
        // No border (e.g., when open)
        return (
            <View style={[{borderRadius: radius, overflow: 'hidden'}, style]}>
                {children}
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#B57FE6', '#6645AB']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[{borderRadius: radius, padding: BORDER_WIDTH}, style]}
        >
            {/* Inner container creates the “hole” so the gradient reads as a 1px border */}
            <View style={{borderRadius: radius - BORDER_WIDTH, overflow: 'hidden', backgroundColor: COLORS.background}}>
                {children}
            </View>
        </LinearGradient>
    );
};

const AccordionRow: React.FC<{
    open: boolean;
    setOpen: (v: boolean) => void;
    label: string;
    icon: React.ReactNode;
}> = ({open, setOpen, label, icon, children}) => (
    <GradientBorder show={!open} style={styles.card}>
        <Pressable onPress={() => setOpen(!open)} style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
                <View style={styles.iconWrap}>{icon}</View>
                <Text style={styles.rowLabel}>{label}</Text>
            </View>
            <Ionicons name={open ? 'chevron-down-outline' : 'chevron-forward-outline'} size={20} color="#c8c6ff"/>
        </Pressable>

        {open && <View style={styles.accordionBody}>{children}</View>}
    </GradientBorder>
);

const PrimaryButton = ({label, onPress, disabled}: {
    label: string; onPress: () => void; disabled?: boolean;
}) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => [
            styles.btn,
            disabled && styles.btnDisabled,
            pressed && !disabled && styles.btnPressed,
        ]}
    >
        <Text style={styles.btnText}>{label}</Text>
    </Pressable>
);

/* ---------- Screen ---------- */
const AccountScreen: React.FC = ({navigation}: any) => {
    // Accordions
    const [usernameOpen, setUsernameOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);

    // Username
    const [username, setUsername] = useState('Honen');
    const [savingUsername, setSavingUsername] = useState(false);
    const usernameValid = username.trim().length >= 3;

    // Email
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [savingEmail, setSavingEmail] = useState(false);
    const emailValid = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email), [email]);
    const emailMatch = email.length > 0 && email === email2;

    // Password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const passwordValid = newPassword.length >= 8 && newPassword === confirmPassword && oldPassword.length > 0;

    const [privateProfile, setPrivateProfile] = useState(false);
    const [savingPrivacy, setSavingPrivacy] = useState(false);

    const saveUsername = async () => {
        if (!usernameValid) return Alert.alert('Username must be at least 3 characters');
        setSavingUsername(true);
        try {
            const r = await apiUpdateUsername(username.trim());
            if (r.ok) Alert.alert('Username updated');
        } finally {
            setSavingUsername(false);
        }
    };

    const saveEmail = async () => {
        if (!emailValid) return Alert.alert('Please enter a valid e-mail');
        if (!emailMatch) return Alert.alert('E-mails do not match');
        setSavingEmail(true);
        try {
            const r = await apiUpdateEmail(email.trim());
            if (r.ok) Alert.alert('E-mail updated');
        } finally {
            setSavingEmail(false);
        }
    };

    const savePassword = async () => {
        if (!passwordValid) return Alert.alert('Check your passwords (8+ chars & match)');
        setSavingPassword(true);
        try {
            const r = await apiUpdatePassword(oldPassword, newPassword);
            if (r.ok) Alert.alert('Password updated');
        } finally {
            setSavingPassword(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const togglePrivacy = async (next: boolean) => {
        setPrivateProfile(next);
        setSavingPrivacy(true);
        try {
            const r = await apiUpdatePrivacy(next);
            if (!r.ok) throw new Error();
        } catch {
            setPrivateProfile(!next);
            Alert.alert('Could not update privacy');
        } finally {
            setSavingPrivacy(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <TopBar variant="account" onBackPress={() => navigation.goBack()}/>
            <ScrollView contentContainerStyle={styles.container}>

                <GradientBorder show={true} style={[styles.card, {marginBottom: 10}]}>
                    <Pressable onPress={() => navigation.navigate("UpdateMeasurements")} style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
                        <View style={styles.rowLeft}>
                            <View style={styles.iconWrap}><Ionicons name="ticket-outline" size={25} color="#c8c6ff"></Ionicons></View>
                            <Text style={styles.rowLabel}>My Measurements</Text>
                        </View>
                        <Ionicons name={'chevron-forward-outline'} size={20}
                                  color="#c8c6ff"/>
                    </Pressable>
                </GradientBorder>

                {/* Username */}
                <AccordionRow
                    open={usernameOpen}
                    setOpen={setUsernameOpen}
                    label="Change Username"
                    icon={<Ionicons name="person-outline" size={25} color="#c8c6ff"/>}
                >
                    <View style={{paddingLeft: 25, paddingRight: 15}}>
                        <Text style={styles.fieldLabel}>Username</Text>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter a username"
                            placeholderTextColor="#77798a"
                            style={styles.input}
                        />
                    </View>
                </AccordionRow>

                <View style={styles.spacer}/>

                {/* E-mail */}
                <AccordionRow
                    open={emailOpen}
                    setOpen={setEmailOpen}
                    label="Change E-mail"
                    icon={<Ionicons name="mail-outline" size={25} color="#c8c6ff"/>}
                >
                    <View style={{paddingLeft: 25, paddingRight: 15}}>
                        <Text style={styles.fieldLabel}>New E-mail</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="name@example.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor="#77798a"
                            style={styles.input}
                        />
                    </View>
                </AccordionRow>

                <View style={styles.spacer}/>

                {/* Password */}
                <AccordionRow
                    open={passwordOpen}
                    setOpen={setPasswordOpen}
                    label="Change Password"
                    icon={<Ionicons name="key-outline" size={25} color="#c8c6ff"/>}
                >
                    <View style={{paddingLeft: 25, paddingRight: 15}}>

                        <Text style={styles.fieldLabel}>Old Password</Text>
                        <View style={styles.passwordField}>
                            <TextInput
                                value={oldPassword}
                                onChangeText={setOldPassword}
                                placeholder="********"
                                secureTextEntry={!showOld}
                                placeholderTextColor="#77798a"
                                style={[styles.input, {flex: 1}]}
                            />
                            <Pressable onPress={() => setShowOld(!showOld)} style={styles.eyeBtn}>
                                <Ionicons name={showOld ? 'eye-outline' : 'eye-off-outline'} size={20} color="#aaa"/>
                            </Pressable>
                        </View>

                        <Text style={styles.fieldLabel}>New Password</Text>
                        <View style={styles.passwordField}>
                            <TextInput
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="(minimum 8 characters)"
                                secureTextEntry={!showNew}
                                placeholderTextColor="#77798a"
                                style={[styles.input, {flex: 1}]}
                            />
                            <Pressable onPress={() => setShowNew(!showNew)} style={styles.eyeBtn}>
                                <Ionicons name={showNew ? 'eye-outline' : 'eye-off-outline'} size={20} color="#aaa"/>
                            </Pressable>
                        </View>

                        <Text style={styles.fieldLabel}>Confirm New Password</Text>
                        <View style={styles.passwordField}>
                            <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="(minimum 8 characters)"
                                secureTextEntry={!showConfirm}
                                placeholderTextColor="#77798a"
                                style={[styles.input, {flex: 1}]}
                            />
                            <Pressable onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                                <Ionicons name={showConfirm ? 'eye-outline' : 'eye-off-outline'} size={20}
                                          color="#aaa"/>
                            </Pressable>
                        </View>
                    </View>
                </AccordionRow>

                <View style={styles.spacer}/>

                {/* Privacy */}
                <AccordionRow
                    open={privacyOpen}
                    setOpen={setPrivacyOpen}
                    label="Privacy"
                    icon={<Ionicons name="lock-closed-outline" size={16} color="#c8c6ff"/>}
                >
                    <View style={{paddingLeft: 25, paddingRight: 15}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={[styles.rowLabel, {color: '#e7e7ff'}]}>Private Profile</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                                {savingPrivacy && <ActivityIndicator size="small" color="#c8c6ff"/>}
                                <Switch
                                    value={privateProfile}
                                    onValueChange={togglePrivacy}
                                    thumbColor={privateProfile ? '#fff' : '#ccc'}
                                    trackColor={{false: '#3a2f75', true: '#a799ff'}}
                                />
                            </View>
                        </View>
                        <Text style={styles.privacyDescription}>
                            Having a private profile means other users need to request to follow you to be able to see
                            your
                            updates.{'\n'}
                            Only when you accept their follow request, will they be able to see your workouts.
                        </Text>
                    </View>
                </AccordionRow>

                <View style={{height: 24}}/>
            </ScrollView>
        </SafeAreaView>
    );
};

/* ---------- styles ---------- */
const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: COLORS.background},
    container: {padding: 16, marginTop: 16},

    card: {
        backgroundColor: 'transparent',
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#6645AB',
        overflow: 'hidden'
    },
    cardOpen: {borderColor: COLORS.primary},

    row: {
        minHeight: 56,
        paddingHorizontal: 14,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowPressed: {backgroundColor: '#141622'},
    rowLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
    rowRight: {flexDirection: 'row', alignItems: 'center', gap: 12},
    iconWrap: {
        width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    },
    rowLabel: {color: '#e7e7ff', fontSize: 18, fontWeight: '600', letterSpacing: 0.2},

    accordionBody: {paddingHorizontal: 16, paddingBottom: 16, paddingTop: 6, gap: 6},

    fieldLabel: {color: 'white', fontSize: 14, marginTop: 12, marginBottom: 8, fontWeight: "700"},
    input: {
        borderColor: '#26263f', borderRadius: 8,
        color: '#f3f3ff', paddingHorizontal: 10, paddingVertical: 10, borderBottomColor: '#4B4B4C', borderBottomWidth: 1
    },

    passwordField: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
    eyeBtn: {marginLeft: -36, padding: 8},

    btn: {
        marginTop: 8,
        backgroundColor: '#6c5ce7',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5a4bcf'
    },
    btnPressed: {opacity: 0.9},
    btnDisabled: {backgroundColor: '#393a5a', borderColor: '#2d2f49'},
    btnText: {color: '#fff', fontWeight: '600', letterSpacing: 0.2},

    spacer: {height: 12},

    privacyDescription: {color: '#b8b9c5', fontSize: 13, lineHeight: 18, paddingRight: 25},
});

export default AccountScreen;
