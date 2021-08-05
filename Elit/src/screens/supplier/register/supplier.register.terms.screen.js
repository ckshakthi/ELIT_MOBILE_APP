import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Accordion from '../../../components/Accordion';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const SupplierRegisterTerms = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Accordion title="Brief">
          <Text style={styles.text}>
            ELIT requires interested suppliers to provide evidence of their
            competency and responsibility prior to entering into a business
            relationship with ELIT,and therefor this pre-qualification
            questionnaire is prepared as supplemental information for evaluating
            suppliers.
          </Text>
          <Text style={styles.text}>
            {' '}
            In order to qualify you, the supplier pre-qualification
            questionnaire together with all of the required information and
            documents as requested, must be submitted for review and succeed.
          </Text>
          <Text style={styles.text}>
            Submittal of this questionnaire authorizes ELIT to investigate of
            any and all statements made in this questionnaire and to use the
            information obtained for reviewing and scoring the responses. if a
            particular question does not apply, the response must state “not
            applicable (na)”. false statements and/or omissions will disqualify
            supplier from pre-qualifying.
          </Text>
          <Text style={{paddingLeft: 5}}>SCAM ALERT</Text>
          <Text style={styles.text}>
            We have been made aware that from time to time members of the public
            may send fraudulent emails and letters, impersonating ELIT group
            procurement & contracts. these e-mails may set-out a fictious set of
            circumstances to induce recipients to provide the sender with
            personal information or money or both. these may sometimes take the
            form of requests for quotations (rfqs) or similar purchase requests.
          </Text>
          <Text style={styles.text}>
            The email and documentation may look convincing. but, you’ll know
            it’s fraudulent if:
          </Text>
          <Text style={styles.text}>
            The email address is different to this format
            (name.lastname@ELIT.com) it’s asking for upfront deposits, security
            deposits or fees for accessing tender documentation. we’d never do
            this. it’s asking for your bank details – remember that as a
            supplier, we capture and verify your banking details during your
            registration phase, when we require any updates to your details.
            it’s out of the blue: you receive a quotation request even if you
            did not do any work with ELIT and its subsidiaries in the past. our
            normal process is to contact prospective suppliers to let them know
            about an opportunity and typically conduct a site briefing to
            discuss our requirements. don't respond to an email you think might
            be fraudulent.
          </Text>
          <Text style={styles.text}>
            If you feel that this may be a valid request, then please contact
            vendor.registration@ELIT.com we will take your information and
            verify whether this is a legitimate request.
          </Text>
        </Accordion>
        <View style={{padding: 5}} />
        <Accordion title="Check List">
          <Text style={styles.text}>
            You must be able to agree on the following statements before you
            complete and submit your pre‐qualification questionnaire for review:
          </Text>
          <Text style={styles.text}>
            I am appropriately registered and licensed in the commodities i’m
            interested to deal with in enoc and/or its subsidiaries.
          </Text>
          <Text style={styles.text}>
            i accept and confirm that i have read the general terms and
            conditions of purchase, supplier code of conduct, information
            non-disclosure agreement and that i understand them and agree to be
            bound by them.
          </Text>
          <Text style={styles.text}>
            I hereby declare that all information furnished in this
            questionnaire is true and current.
          </Text>
          <Text style={styles.text}>
            I pledge that to the best of my knowledge, our company is in
            compliance with the conflict of interest ("coi") policy, located in
            the "integrity" section under "conflict of interest" (page 11) of
            the enoc supplier code of conduct and have disclosed our material,
            financial or individual coi, if any, fully. i further confirm that
            shall any future coi arise, we will make efforts to make them known
            to enoc.
          </Text>
          <Text style={styles.text}>
            Supplier will take reasonable steps to prevent unauthorized access
            to the portal. for access to certain areas of the portal, including
            the account, it may require both a user name and a password. only
            one user can use one user name and password and, thus, one account.
            by limiting access, it helps avoid unauthorized usage by other
            persons or entities because anyone with knowledge of both your user
            name and password can gain entry to the portal and your account.
            accordingly, by using the portal, you agree to consider your user
            name and password as confidential information and to keep your user
            name and password confidential. you also agree not to use another
            user’s user name and password. you will immediately notify enoc if
            you become aware of any loss or theft of your password or any
            unauthorized use of your user name and password. enoc cannot and
            will not be liable for any loss or damage arising from your failure
            to comply with these obligations. enoc reserves the right to delete
            or change (with notice) a user name or password at any time and for
            any reason.
          </Text>
        </Accordion>
        <View style={styles.buttonStyle}>
          <CustomButton
            buttonTitle="I AGREE"
            buttonTheme="create"
            style={styles.btn}
            buttonLoading={false}
            onPress={() => navigation.navigate('suppliercreation')}
          />
          <CustomButton
            buttonTitle="I DECLINE"
            buttonTheme="create"
            style={styles.btn}
            buttonLoading={false}
            onPress={() =>
              Alert.alert('Warning', "Sorry you can't register with us", [
                {text: 'OK', onPress: () => navigation.navigate('Login')},
              ])
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SupplierRegisterTerms;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    paddingTop: 15,
  },
  scrollView: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  text: {
    marginLeft: 10,
    marginTop: 3,
    marginBottom: 3,
    fontSize: 14,
  },
  buttonStyle: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 16,
    width: windowWidth * 0.32,
    height: windowHeight * 0.1,
  },
});
