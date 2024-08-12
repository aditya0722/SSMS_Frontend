import React from 'react';
import NavBar from './NavBar';
const ConstitutionPage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-blue-50 text-blue-900 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6">सामसिङ् सवाली माजव संस्कार समिति </h1>

          {/* Preamble */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">प्रस्तावना</h2>
            <p className="mb-4">
              सर्वप्रथम, सान्त राज्य र महान राष्ट्र प्रति नतमस्तक भई नमन अर्पण मर्दै राज्य र राष्ट्रको सर्वोच्च संविधानलाई शिरोपर राख्खी श्रद्धा-सम्मान जनाँउदै हामी हाम्रो समितिको संवौधान पारित गर्न गइरहेका छौं।
            </p>
            <p>
              यस सविधानभित्र अन्तर्भुक्त गरिएका धारा (कानुन) हरु सर्वसम्मति द्वारा खुल्ला एवं स्वतन्त्र बहस पश्चात पुर्ण सहमतिका साथ पारित गरिएका हुन। यी सम्पुर्ण संविधान का धाराहरु कुनै पनि कल्पना, भावना र मनज्ञानी होइनन्। समयमा कुनै पनि सम्वैधानीक धाराहरु फेर बदल, संशोधन अथवा कुनै समय सपेक्ष धाराहरु थप्न या गाभ्न परे पुन; समितिका सम्वेदन शिल बहस एंव छल फल पश्चात पारित गरिएका निचोड प्रस्तावहरुलाई समावेश गरिने छ।
            </p>
          </section>

          {/* English Translation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Preamble</h2>
            <p className="mb-4">
              First of all, bowing down to the peaceful state and great nation and paying homage to the supreme constitution of the state and nation, we are going to pass the constitution of our committee.
            </p>
            <p>
              The clauses (laws) included in this constitution have been passed with full consensus after open and free discussion. All these clauses of the constitution are not mere imaginations, feelings, or whims. If at any time the constitutional clauses need to be amended, supplemented, or revised according to the time, the conclusions of the sensitive discussions and debates of the committee will be included.
            </p>
          </section>

          {/* Articles of the Constitution */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">संविधानका धारा (Articles of the Constitution)</h2>

            <div className="mb-4">
              <p><strong>संख्या 1:</strong> समितिको कानुन गताविक प्रतेक सदस्य-सदस्यालाई एकै रुपमा कानुन लानु हुनेछ।</p>
              <p><strong>Article 1:</strong> Each member of the committee will be equally subject to the law.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 2:</strong> समिति भित्र कहिल्यै-कुनै सदस्य-सदस्याले कदाचित राज्नीती, धर्मनिति, धनी- गरीब, उव-बिच जाति भेद, रंग-वर्ग भेद साथै लिङ्ग भेद जस्ता विषयहरु मिसाइने छैन।</p>
              <p><strong>Article 2:</strong> Within the committee, no member will mix politics, religious beliefs, wealth-poverty, caste discrimination, color-class discrimination, or gender discrimination.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 3:</strong> समितिको सभा वा कुनै पनि कार्यक्रमहरुमा कसैले पनि कुनै प्रकारको मत-पान नगरीकन उपस्थिति दिने कानून पारित गरियो।</p>
              <p><strong>Article 3:</strong> It has been passed that no one shall attend the committee's meetings or programs under the influence of alcohol or any other intoxicants.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 4:</strong> समितिको कानून वा सविधान सम्पुर्ण सदस्य-सदस्याहरुको उपस्थितिमा पूर्ण समर्थन्को साथ पारित गरिने छ अनि उक्त संविधानलाई हर हालतमा निष्ठा र श्रद्धा पूर्वक सिरोपर राखी काम गर्ने प्रतिज्ञ गरिने साथै समयको परिस्थिति र समयको मांग अनुसार कुनै पनि समयमा संविधान संसोधन वा फेर बदल गर्नु परे सम्पुर्ण सदस्य सदस्याको उचित बिचार - बिमर्स अनि पूर्ण समर्थनको साथ सम्भव हुनेछ। (55 मा० सभा)</p>
              <p><strong>Article 4:</strong> The laws or constitution of the committee will be passed with full support in the presence of all members. It will be pledged to uphold this constitution with integrity and respect under all circumstances. If any amendments or changes are required, it will be done with proper discussion and full support from all members.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 5:</strong> अनुशासन, सिष्टवार, सद्‌भावाना र सत विचारलाई बिना हिच्कीचाहत बिना संकोव, खुल्ला, निःस्वार्थ, निस्पक्ष एवं पुर्ण पार्दरसिताको साथ प्रत्येक कार्यक्रम वा कार्ययोजना तयार गरिने छ यदि कसैलाई यसमा कुनै पनि संका, संकोच वा आपत्ती भए तेहिक्षण बडो संवेदनशील भइ पुनः छल-फल गरिने छ त्येस पश्चात मात्र उक्त कानून अथवा नियमलाई पूर्ण समर्थनको साथ पारित भरिने छ।</p>
              <p><strong>Article 5:</strong> Each program or plan will be prepared without hesitation, doubt, or bias, with discipline, courtesy, goodwill, and good thoughts. If anyone has any doubts, they will be addressed sensitively, and the law or rule will only be passed with full support after proper discussion.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 6:</strong> समितिको सदस्य सदस्यागणले समयलाई एकदमै ध्यान दिनुपर्नेछ, तोकिएको ठीक समयामा हाजिरि दिनु पर्ने छ, यदि सही समयमा उपस्थिति दिन नसके रु 50/- (पचास) रुपियाँ जरिमाना भुक्तान गर्नु पर्ने कानुन पारित गरिएको छ।</p>
              <p><strong>Article 6:</strong> Members must pay close attention to time and attend at the specified time. If unable to attend on time, a fine of NPR 50/- (fifty rupees) must be paid as per the law passed.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 7:</strong> यदि कुनै जानकारी नदिइ सभाहरुमा हजिर नभए रु 100% (एक सय रुपिया) भूक्तान गर्नुपर्नेछ।</p>
              <p><strong>Article 7:</strong> If a member fails to attend meetings without prior notice, they must pay a fine of NPR 100/- (one hundred rupees).</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 8:</strong> यदि मासिक सुल्क निर्धारित समय देखी दस दिन भित्र बुझाउन नसकेको खण्डमा रु 100/- (एक सय रुपयाँ) जरिमाना लाग्ने छ।</p>
              <p><strong>Article 8:</strong> If the monthly fee is not paid within ten days from the due date, a fine of NPR 100/- (one hundred rupees) will be imposed.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 9:</strong> प्रत्येक मासिक सभाहरुमा मासिक हिसाब खाता नियमित रुपले पाठन गर्ने कानुन पारित गरियो भने वार्षिक प्रतिवेदन प्रत्येक वर्ष नियमित रुपमा पेष गरिने छ।</p>
              <p><strong>Article 9:</strong> It has been passed that monthly accounts will be regularly read out in each monthly meeting, and an annual report will be submitted each year.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 10:</strong> समितिका कोइपनि सदस्य-सदस्या क्रमैले तिन महिना मासिक सभाहरूमा उपस्थिति नदिए वहाँको सदस्यता नै खारिज गरिने छ। वहाँले पुन समितिमा आउन चाहन्छान भने, प्रथमिक सदस्यताको रकम भुकान गर्नु पर्ने छ। (55 भा० स०)</p>
              <p><strong>Article 10:</strong> If any member fails to attend three consecutive monthly meetings, their membership will be terminated. If they wish to rejoin, they must pay the primary membership fee.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 11:</strong> समितिमा नयाँ सदस्यता लिज वाहाने परिवार अथवा व्याक्तिले सदस्यता लिन अधि समितिका 3 वटा मासिक सभाहरुमा नियमीत रुपले सुन्न पर्ने छ, सधै समितिका सबै औपवारितालाई अनुशासित ढंगमा पुरा गर्नु पर्ने छ। समितिले निर्धारण गरिएका सदस्यता जोडने क्रममा स्थापित सदस्यता (Founder Member) भित्रबाट नै आएका उमेद्वारलाई भने नयाँ सदस्यता (Fresh Member) सासीको 50 (पनास प्रतिसत) यसी भुक्तान गर्नु पर्ने छ। येस पहतीलाई भविष्यमा फेर बदल मर्न परे, सोही समय उचित विकल्प लिई कानून तय गरिने छ ।</p>
              <p><strong>Article 11:</strong> Any family or individual who wants to take membership in the committee must regularly attend three monthly meetings of the committee before obtaining membership. They must fulfill all the official responsibilities of the committee in a disciplined manner. If a candidate comes from within the established membership (Founder Member) during the process of adding new members, they must pay 50% (fifty percent) of the new membership fee. If this provision needs to be changed in the future, appropriate options will be considered, and laws will be made at that time.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 12:</strong> गाँउ समाज भित्र कुनै आपतकालिन समयमा समितिका सदस्यगण तुरुन्तै उपस्थिति दिई (Rescue Operation) आपत प्रबन्धनको निम्ति तत्कालिन बैठक बस्नु पर्ने काजून बनाईयो ।</p>
              <p><strong>Article 12:</strong>  In case of any emergency within the village, the committee members must immediately be present and hold a meeting to manage the emergency (Rescue Operation).</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 13:</strong>  समाज भित्र कुनै प्रकारको रोग हैजा वा कुनै आपत्ती- विपत्ती आइलागेर समितिका कुनै पनि सदस्य-सदस्या भम्भिर अवस्थामा भएको खण्डमा पीडितको अवस्था अनुसार सहयोग को निम्ति नियमित दरले खाता बनाइ घुमाइने छ।</p>
              <p><strong>Article 13:</strong> If any committee member is in a serious condition due to any disease, cholera, or any disaster within the community, a regular fund will be created and circulated for assistance according to the condition of the affected member.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 14:</strong> T समितिले कुनै कुनै विश्वदिवसहरु पालन गर्ने नियम बनाइयो । समितिले गाँउ समाजमा आवश्यक्ता अनुसार कल्याणकारी एवं उथानमुलक कामहरु गर्ने नियम बनाइएको छ। जस्तै<br/>

                1. साफ-सफाई अभियान<br/>

                2. जल-संरक्षण अभियान<br/>

                3. हरित क्रान्ती अभियान<br/>

                4. शिक्षा अनि स्वास्थ्य अभियान<br/>

                5. खेल कुद, सङ्गीतिक एवं साहित्यिक अभियान</p>
              <p><strong>Article 14:</strong>  The committee has established rules to observe certain World Days. The committee has also made rules to undertake welfare and upliftment activities as needed within the village community, such as:<br/>

                1. Cleanliness Campaign<br/>

                2. Water Conservation Campaign<br/>

                3. Green Revolution Campaign<br/>

                4. Education and Health Campaign<br/>
                
                5. Sports, Music, and Literary Campaign</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 15:</strong> समितिबाट निष्कासित हुने सदस्यले यहाँ आपलो लागत, समितिको कोषबाट कुनै सर-समान, सामाग्रीहरु र धन राशी केठि फिर्ता लिन पाइने छैन साथै वहाँ समितिको हक, अधिकार र समितिको फाइना लिनबाट सथा बन्चित रहनु हुने छ। (प्रस्ताव 55)</p>
              <p><strong>Article 15:</strong> A member expelled from the committee will not be able to reclaim any investment, property, materials, or money from the committee's funds. They will also be deprived of the rights, privileges, and benefits of the committee.</p>
            </div>

            <div className="mb-4">
              <p><strong>संख्या 16:</strong> समितिको सम्पुर्ण पद-भार प्रत्येक 5 (पाच) वर्षमा चयन गरिने कानुन पारित भरिएको छ।</p>
              <p><strong>Article 16:</strong> The law has been passed that all positions in the committee will be elected every 5 (five) years.</p>
            </div>

          </section>
        </div>
      </div>
    </>
  );
}

export default ConstitutionPage;
