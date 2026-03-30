// MediTakip - Snack için tek dosya versiyon
import React, { useState, createContext, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StyleSheet, SafeAreaView, Alert, Modal, Switch, Platform,
  StatusBar, Dimensions,
} from 'react-native';

// ===== TEMA =====
const C = {
  primary: '#0FA87C', dark: '#1A7F6E', light: '#A8EDD4',
  bg: '#EEF7F4', card: '#fff', border: '#D6EDE8',
  t1: '#12201E', t2: '#4A6560', t3: '#9DB8B2',
  red: '#E84040', redBg: '#FFECEC',
  blue: '#3B7BF5', blueBg: '#EAF0FF',
  amber: '#F5A623', amberBg: '#FFF5E6',
  greenBtn: '#A8EDD4', greenBtnTxt: '#0A5C44',
};

// ===== GLOBAL STATE =====
const Ctx = createContext();
const useApp = () => useContext(Ctx);

const AppProvider = ({ children }) => {
  const [hasta, setHasta] = useState({
    ad: 'Ahmet Kaya', tc: '123 456 789 00', dogum: '15.03.1966',
    kanGrubu: 'A Rh+', boy: '175', kilo: '82',
    tel: '+90 532 xxx xx xx', email: 'ahmet@gmail.com', acilKisi: 'Fatma Kaya',
  });
  const [teshisler, setTeshisler] = useState([
    { id: '1', ad: 'Tip 2 Diyabet', bg: '#FFECEC', color: '#E84040' },
    { id: '2', ad: 'Hipertansiyon', bg: '#EAF0FF', color: '#3B7BF5' },
    { id: '3', ad: 'Kolesterol', bg: '#E0F5EF', color: '#0FA87C' },
  ]);
  const [ilaclar, setIlaclar] = useState([
    { id: '1', ad: 'Metformin 1000mg', acik: 'Kan şekeri düzenleyici', emoji: '💊', bg: '#E0F5EF',
      saatler: [{ id: 's1', saat: '08:00', doz: '1 tablet', durum: 'alindi' }, { id: 's2', saat: '20:00', doz: '1 tablet', durum: 'bekliyor' }] },
    { id: '2', ad: 'Ramipril 5mg', acik: 'Tansiyon düşürücü', emoji: '🩺', bg: '#EAF0FF',
      saatler: [{ id: 's3', saat: '07:30', doz: '1 tablet', durum: 'bekliyor' }] },
    { id: '3', ad: 'Rosuvastatin 20mg', acik: 'Kolesterol düşürücü', emoji: '💉', bg: '#FFF5E6',
      saatler: [{ id: 's4', saat: '22:00', doz: '1 tablet', durum: 'alindi' }] },
    { id: '4', ad: 'Aspirin 100mg', acik: 'Kan sulandırıcı', emoji: '🔴', bg: '#FFECEC',
      saatler: [{ id: 's5', saat: '13:00', doz: '1 tablet', durum: 'bekliyor' }] },
  ]);
  const [kanallar, setKanallar] = useState({
    push: { aktif: true, adresler: ['Bu cihaz'] },
    eposta: { aktif: true, adresler: ['ahmet@gmail.com', 'ahmet@outlook.com'] },
    whatsapp: { aktif: true, adresler: ['+90 532 xxx xx xx'] },
    facebook: { aktif: false, adresler: [] },
    instagram: { aktif: false, adresler: [] },
  });
  const [sessiz, setSessiz] = useState(false);

  const ilacDurumGuncelle = (ilacId, saatId, durum) => {
    setIlaclar(ilaclar.map(il => il.id !== ilacId ? il : {
      ...il, saatler: il.saatler.map(s => s.id === saatId ? { ...s, durum } : s)
    }));
  };

  return (
    <Ctx.Provider value={{ hasta, setHasta, teshisler, setTeshisler, ilaclar, setIlaclar, ilacDurumGuncelle, kanallar, setKanallar, sessiz, setSessiz }}>
      {children}
    </Ctx.Provider>
  );
};

// ===== ORTAK BILEŞENLER =====
const GBtn = ({ label, onPress, style, red }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.75}
    style={[{ backgroundColor: red ? C.redBg : C.greenBtn, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 7, alignItems: 'center' }, style]}>
    <Text style={{ color: red ? C.red : C.greenBtnTxt, fontWeight: '800', fontSize: 10 }}>{label}</Text>
  </TouchableOpacity>
);

const Hdr = ({ title, sub, right }) => (
  <View style={{ backgroundColor: C.dark, paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 44 : 16, paddingBottom: 16 }}>
    <StatusBar barStyle="light-content" backgroundColor={C.dark} />
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <View><Text style={{ color: '#fff', fontSize: 17, fontWeight: '800' }}>{title}</Text>
        {sub ? <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 2 }}>{sub}</Text> : null}
      </View>
      {right}
    </View>
  </View>
);

const Card = ({ children, style }) => (
  <View style={[{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginBottom: 7 }, style]}>
    {children}
  </View>
);

const Acc = ({ ico, title, sub, badge, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <TouchableOpacity onPress={() => setOpen(!open)} activeOpacity={0.85}
        style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 }}>
        <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15 }}>{ico}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '800', color: C.t1 }}>{title}</Text>
          {sub ? <Text style={{ fontSize: 10, color: C.t3, marginTop: 1 }}>{sub}</Text> : null}
        </View>
        {badge ? (
          <View style={{ backgroundColor: badge.bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 }}>
            <Text style={{ fontSize: 9, fontWeight: '800', color: badge.color }}>{badge.label}</Text>
          </View>
        ) : (
          <GBtn label={open ? '− Kapat' : '+ Ekle'} onPress={() => setOpen(!open)}
            style={open ? { backgroundColor: C.primary } : {}} />
        )}
      </TouchableOpacity>
      {open && <View style={{ borderTopWidth: 1, borderTopColor: C.border }}>{children}</View>}
    </Card>
  );
};

// ===== PROFIL EKRANI =====
const ProfilScreen = () => {
  const { hasta, setHasta, teshisler, setTeshisler, kanallar, setKanallar } = useApp();
  const [editF, setEditF] = useState(null);
  const [editV, setEditV] = useState('');
  const [yeniT, setYeniT] = useState('');
  const [kInp, setKInp] = useState({ eposta: '', whatsapp: '', facebook: '', instagram: '' });

  const fields = [
    { key: 'tc', label: 'TC KİMLİK' }, { key: 'dogum', label: 'DOĞUM TARİHİ' },
    { key: 'kanGrubu', label: 'KAN GRUBU' }, { key: 'boy', label: 'BOY (cm)' },
    { key: 'kilo', label: 'KİLO (kg)' }, { key: 'tel', label: 'TELEFON' },
    { key: 'email', label: 'E-POSTA' }, { key: 'acilKisi', label: 'ACİL KİŞİ' },
  ];

  const tRenkler = [
    { bg: '#FFECEC', color: '#E84040' }, { bg: '#EAF0FF', color: '#3B7BF5' },
    { bg: '#E0F5EF', color: '#0FA87C' }, { bg: '#FFF5E6', color: '#B07A00' }, { bg: '#F3EEFF', color: '#7B4FD4' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Hdr title="Hasta Profili" sub="Kişisel bilgiler & ayarlar" />
      <ScrollView style={{ flex: 1, padding: 13 }} showsVerticalScrollIndicator={false}>

        {/* AVATAR & İSİM */}
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>AK</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: '800', color: C.t1, marginTop: 8 }}>{hasta.ad}</Text>
          <Text style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>TC: {hasta.tc} · {hasta.kanGrubu}</Text>
        </View>

        {/* TEŞHİSLER */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 12, justifyContent: 'center' }}>
          {teshisler.map(t => (
            <TouchableOpacity key={t.id} onPress={() => setTeshisler(teshisler.filter(x => x.id !== t.id))}
              style={{ backgroundColor: t.bg, paddingHorizontal: 11, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: t.color }}>{t.ad} ×</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 14 }}>
          <TextInput style={[st.inp, { flex: 1 }]} value={yeniT} onChangeText={setYeniT} placeholder="Yeni teşhis ekle..." />
          <GBtn label="+ Ekle" onPress={() => {
            if (!yeniT.trim()) return;
            const r = tRenkler[teshisler.length % tRenkler.length];
            setTeshisler([...teshisler, { id: Date.now().toString(), ad: yeniT.trim(), ...r }]);
            setYeniT('');
          }} />
        </View>

        {/* KİŞİSEL BİLGİLER */}
        <Acc ico="🪪" title="Kişisel Bilgiler" sub="TC, doğum, kan grubu...">
          <View style={{ padding: 10 }}>
            {fields.map(f => (
              <View key={f.key}>
                <View style={st.infoRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={st.infoLbl}>{f.label}</Text>
                    <Text style={st.infoVal}>{hasta[f.key] || '—'}</Text>
                  </View>
                  <GBtn label="✏" onPress={() => { setEditF(f.key); setEditV(hasta[f.key] || ''); }} />
                </View>
                {editF === f.key && (
                  <View style={{ flexDirection: 'row', gap: 5, marginBottom: 6 }}>
                    <TextInput style={[st.inp, { flex: 1 }]} value={editV} onChangeText={setEditV} autoFocus />
                    <GBtn label="✓" onPress={() => { setHasta({ ...hasta, [f.key]: editV }); setEditF(null); }} />
                    <GBtn label="✕" red onPress={() => setEditF(null)} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </Acc>

        {/* BİLDİRİM KANALLARI */}
        <Acc ico="🔔" title="Bildirim Kanalları" sub="Birden fazla adres eklenebilir">
          <View style={{ padding: 10 }}>
            {[
              { key: 'eposta', ico: '✉️', label: 'E-Posta', ph: 'E-posta ekle...' },
              { key: 'whatsapp', ico: '💬', label: 'WhatsApp', ph: 'Numara ekle...' },
              { key: 'facebook', ico: '📘', label: 'Facebook', ph: 'Kullanıcı adı...' },
              { key: 'instagram', ico: '📷', label: 'Instagram', ph: 'Kullanıcı adı...' },
            ].map(k => (
              <View key={k.key} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Text style={{ fontSize: 14 }}>{k.ico}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: C.t1, flex: 1 }}>{k.label}</Text>
                </View>
                {(kanallar[k.key]?.adresler || []).map((a, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 7, backgroundColor: '#F5FBF9', borderRadius: 8, borderWidth: 1, borderColor: C.border, marginBottom: 4 }}>
                    <Text style={{ flex: 1, fontSize: 11, fontWeight: '700', color: C.t1 }}>{a}</Text>
                    <GBtn label="×" red onPress={() => {
                      const y = { ...kanallar };
                      y[k.key].adresler = y[k.key].adresler.filter((_, j) => j !== i);
                      setKanallar(y);
                    }} />
                  </View>
                ))}
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <TextInput style={[st.inp, { flex: 1 }]} value={kInp[k.key]} onChangeText={v => setKInp({ ...kInp, [k.key]: v })} placeholder={k.ph} />
                  <GBtn label="+ Ekle" onPress={() => {
                    if (!kInp[k.key].trim()) return;
                    const y = { ...kanallar };
                    y[k.key].adresler = [...(y[k.key]?.adresler || []), kInp[k.key].trim()];
                    setKanallar(y);
                    setKInp({ ...kInp, [k.key]: '' });
                  }} />
                </View>
                <View style={{ height: 1, backgroundColor: C.border, marginTop: 8 }} />
              </View>
            ))}
          </View>
        </Acc>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== İLAÇLAR EKRANI =====
const IlaclarScreen = () => {
  const { ilaclar, setIlaclar, ilacDurumGuncelle } = useApp();
  const [acikId, setAcikId] = useState(null);
  const [filtre, setFiltre] = useState('hepsi');
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ad: '', acik: '', emoji: '💊', saatler: [] });
  const [saatInp, setSaatInp] = useState('08:00');
  const [dozInp, setDozInp] = useState('1 tablet');
  const [arama, setArama] = useState('');

  const RENKLER = ['#E0F5EF', '#EAF0FF', '#FFF5E6', '#F3EEFF', '#FFECEC'];
  const ILACDB = ['Metformin', 'Ramipril', 'Aspirin', 'Atorvastatin', 'Omeprazol', 'Amlodipin', 'Losartan', 'Rosuvastatin', 'Pantoprazol', 'Lisinopril'];

  const filtreli = ilaclar.filter(i => {
    if (filtre === 'alindi') return i.saatler.every(s => s.durum === 'alindi');
    if (filtre === 'bekliyor') return i.saatler.some(s => s.durum !== 'alindi');
    return true;
  });

  const ali = ilaclar.filter(i => i.saatler.every(s => s.durum === 'alindi')).length;

  const saatBadge = (saat) => {
    const h = parseInt(saat.split(':')[0]);
    if (h >= 6 && h < 12) return { bg: '#FFF5E6', color: '#B07A00' };
    if (h >= 12 && h < 18) return { bg: '#EAF0FF', color: '#3B7BF5' };
    if (h >= 18 && h < 22) return { bg: '#F3EEFF', color: '#7B4FD4' };
    return { bg: '#1A1A2E', color: '#fff' };
  };

  const kaydet = () => {
    if (!form.ad.trim()) { Alert.alert('Uyarı', 'İlaç adı girin!'); return; }
    if (editId) {
      setIlaclar(ilaclar.map(i => i.id === editId ? { ...i, ...form } : i));
    } else {
      setIlaclar([...ilaclar, { ...form, id: Date.now().toString(), bg: RENKLER[ilaclar.length % RENKLER.length] }]);
    }
    setModal(false); setEditId(null); setForm({ ad: '', acik: '', emoji: '💊', saatler: [] }); setArama('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Hdr title="İlaçlarım" sub={new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
        right={<TouchableOpacity onPress={() => { setEditId(null); setForm({ ad: '', acik: '', emoji: '💊', saatler: [] }); setModal(true); }}
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>+ Yeni İlaç</Text>
        </TouchableOpacity>} />

      {/* STAT */}
      <View style={{ flexDirection: 'row', gap: 8, margin: 12 }}>
        {[{ val: ilaclar.length, lbl: 'TOPLAM', color: C.primary }, { val: ali, lbl: 'ALINDI', color: C.primary }, { val: ilaclar.length - ali, lbl: 'BEKLİYOR', color: C.red }].map((s, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: s.color }}>{s.val}</Text>
            <Text style={{ fontSize: 9, color: C.t3, fontWeight: '700', marginTop: 2 }}>{s.lbl}</Text>
          </View>
        ))}
      </View>

      {/* FİLTRE */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 13, marginBottom: 8 }}>
        <Text style={{ fontSize: 11, fontWeight: '800', color: C.t2 }}>BUGÜNKÜ İLAÇLAR</Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {['hepsi', 'bekliyor', 'alindi'].map(f => (
            <TouchableOpacity key={f} onPress={() => setFiltre(f)}
              style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: filtre === f ? C.primary : C.border, backgroundColor: filtre === f ? C.primary : 'rgba(255,255,255,0.7)' }}>
              <Text style={{ fontSize: 9, fontWeight: '800', color: filtre === f ? '#fff' : C.t3 }}>
                {f === 'hepsi' ? 'Hepsi' : f === 'bekliyor' ? 'Bekliyor' : 'Alındı'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 13 }} showsVerticalScrollIndicator={false}>
        {filtreli.map(ilac => (
          <Card key={ilac.id}>
            <TouchableOpacity onPress={() => setAcikId(acikId === ilac.id ? null : ilac.id)} activeOpacity={0.85}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 11, gap: 10 }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: ilac.bg, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{ilac.emoji}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 13, fontWeight: '800', color: C.t1 }}>{ilac.ad}</Text>
                <Text style={{ fontSize: 10, color: C.t3, marginTop: 2 }} numberOfLines={1}>{ilac.acik}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 3 }}>
                {ilac.saatler.slice(0, 2).map(s => {
                  const b = saatBadge(s.saat);
                  return <View key={s.id} style={{ backgroundColor: b.bg, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: b.color }}>{s.saat}</Text>
                  </View>;
                })}
              </View>
            </TouchableOpacity>

            {acikId === ilac.id && (
              <View style={{ borderTopWidth: 1, borderTopColor: C.border, padding: 10 }}>
                {ilac.saatler.map(s => (
                  <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <View style={[{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 }, { backgroundColor: saatBadge(s.saat).bg }]}>
                      <Text style={{ fontSize: 11, fontWeight: '800', color: saatBadge(s.saat).color }}>{s.saat}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: C.t3, flex: 1 }}>{s.doz}</Text>
                    <TouchableOpacity onPress={() => ilacDurumGuncelle(ilac.id, s.id, 'alindi')}
                      style={{ paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, backgroundColor: s.durum === 'alindi' ? C.primary : '#E0F5EF' }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: s.durum === 'alindi' ? '#fff' : C.greenBtnTxt }}>✓ Alındı</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ilacDurumGuncelle(ilac.id, s.id, 'atlandi')}
                      style={{ paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, backgroundColor: s.durum === 'atlandi' ? C.red : C.redBg }}>
                      <Text style={{ fontSize: 10, fontWeight: '800', color: s.durum === 'atlandi' ? '#fff' : C.red }}>✕ Atlandı</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={{ flexDirection: 'row', gap: 5, borderTopWidth: 1, borderTopColor: C.border, paddingTop: 8 }}>
                  <GBtn label="✏ Düzenle" style={{ flex: 1 }} onPress={() => {
                    setEditId(ilac.id); setForm({ ad: ilac.ad, acik: ilac.acik, emoji: ilac.emoji, saatler: ilac.saatler });
                    setModal(true);
                  }} />
                  <GBtn label="🗑 Sil" red style={{ flex: 1 }} onPress={() =>
                    Alert.alert('Sil', 'Bu ilacı silmek istiyor musunuz?', [
                      { text: 'İptal' }, { text: 'Sil', style: 'destructive', onPress: () => setIlaclar(ilaclar.filter(i => i.id !== ilac.id)) }
                    ])} />
                </View>
              </View>
            )}
          </Card>
        ))}

        <TouchableOpacity onPress={() => { setEditId(null); setForm({ ad: '', acik: '', emoji: '💊', saatler: [] }); setModal(true); }}
          style={{ borderRadius: 14, borderWidth: 2, borderColor: '#B0D8CF', borderStyle: 'dashed', padding: 13, alignItems: 'center', marginTop: 4 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: C.primary }}>+ Yeni ilaç ekle</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView style={{ padding: 16 }} keyboardShouldPersistTaps="handled">
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.t1, marginBottom: 14 }}>{editId ? 'İlacı Düzenle' : 'Yeni İlaç Ekle'}</Text>

            <Text style={st.lbl}>İLAÇ ADI YAZARAK ARA</Text>
            <TextInput style={st.inp} value={arama} onChangeText={v => { setArama(v); setForm({ ...form, ad: v }); }} placeholder="İlaç adı yaz..." />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
              {ILACDB.filter(x => arama && x.toLowerCase().includes(arama.toLowerCase())).map((x, i) => (
                <TouchableOpacity key={i} onPress={() => { setArama(x); setForm({ ...form, ad: x }); }}
                  style={{ backgroundColor: C.greenBtn, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: C.greenBtnTxt }}>{x}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={st.lbl}>İLAÇ ADI & DOZU</Text>
            <TextInput style={st.inp} value={form.ad} onChangeText={v => setForm({ ...form, ad: v })} placeholder="İlaç adı & dozu *" />
            <Text style={st.lbl}>AÇIKLAMA</Text>
            <TextInput style={st.inp} value={form.acik} onChangeText={v => setForm({ ...form, acik: v })} placeholder="Ne işe yarar?" />

            <Text style={st.lbl}>KULLANIM SAATLERİ</Text>
            <View style={{ flexDirection: 'row', gap: 5, marginBottom: 8, alignItems: 'center' }}>
              <TextInput style={[st.inp, { flex: 1 }]} value={saatInp} onChangeText={setSaatInp} placeholder="SS:DD" />
              <TextInput style={[st.inp, { flex: 1.3 }]} value={dozInp} onChangeText={setDozInp} placeholder="1 tablet" />
              <GBtn label="+ Ekle" onPress={() => {
                if (!saatInp) return;
                setForm({ ...form, saatler: [...form.saatler, { id: Date.now().toString(), saat: saatInp, doz: dozInp || '1 tablet', durum: 'bekliyor' }] });
                setSaatInp(''); setDozInp('1 tablet');
              }} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
              {form.saatler.map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF7F4', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: C.border }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: C.t1 }}>{s.saat} · {s.doz}</Text>
                  <TouchableOpacity onPress={() => setForm({ ...form, saatler: form.saatler.filter((_, j) => j !== i) })}>
                    <Text style={{ color: C.red, fontWeight: '900', marginLeft: 5 }}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: 'row', gap: 7, marginBottom: 30 }}>
              <TouchableOpacity onPress={() => { setModal(false); setEditId(null); }}
                style={{ flex: 1, padding: 10, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.bg, alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', color: C.t2 }}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={kaydet} style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', color: '#fff' }}>Kaydet ✓</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

// ===== TAKVİM EKRANI =====
const TR_AY = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const TR_GUN = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];

const TakvimScreen = () => {
  const { ilaclar } = useApp();
  const [view, setView] = useState('aylik');
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);
  const [selDay, setSelDay] = useState(29);
  const today = new Date();

  const buildCal = () => {
    const first = new Date(year, month, 1).getDay();
    const off = (first + 6) % 7;
    const dim = new Date(year, month + 1, 0).getDate();
    const prev = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = 0; i < off; i++) cells.push({ d: prev - off + 1 + i, other: true });
    for (let d = 1; d <= dim; d++) cells.push({ d, other: false });
    while (cells.length < 42) cells.push({ d: cells.length - off - dim + 1, other: true });
    return cells;
  };

  const dayIlaclar = ilaclar.flatMap(il => il.saatler.map(s => ({ ...s, ilacAd: il.ad, emoji: il.emoji, bg: il.bg })));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ backgroundColor: C.dark, paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 44 : 16, paddingBottom: 16 }}>
        <StatusBar barStyle="light-content" backgroundColor={C.dark} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <View><Text style={{ color: '#fff', fontSize: 17, fontWeight: '800' }}>Takvim</Text>
            <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 2 }}>{TR_AY[month]} {year}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}
              style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>‹</Text>
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700', minWidth: 85, textAlign: 'center' }}>{TR_AY[month]} {year}</Text>
            <TouchableOpacity onPress={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}
              style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 20, padding: 3, gap: 2 }}>
          {['aylik', 'haftalik', 'gunluk'].map(v => (
            <TouchableOpacity key={v} onPress={() => setView(v)} style={{ flex: 1, paddingVertical: 5, borderRadius: 16, alignItems: 'center', backgroundColor: view === v ? '#fff' : 'transparent' }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: view === v ? C.primary : 'rgba(255,255,255,0.7)' }}>
                {v === 'aylik' ? 'Aylık' : v === 'haftalik' ? 'Haftalık' : 'Günlük'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {view === 'aylik' && (
          <>
            <View style={{ margin: 12, backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 4, paddingTop: 8, paddingBottom: 4 }}>
                {TR_GUN.map(g => <Text key={g} style={{ flex: 1, textAlign: 'center', fontSize: 9, fontWeight: '800', color: C.t3 }}>{g}</Text>)}
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 4, paddingBottom: 8, gap: 2 }}>
                {buildCal().map((c, i) => {
                  const isSel = !c.other && c.d === selDay;
                  const isToday2 = !c.other && c.d === today.getDate() && month === today.getMonth();
                  return (
                    <TouchableOpacity key={i} onPress={() => !c.other && setSelDay(c.d)}
                      style={{ width: '13.5%', minHeight: 44, borderRadius: 10, padding: 4, alignItems: 'center', gap: 2,
                        backgroundColor: isSel ? C.primary : isToday2 ? '#E0F5EF' : 'transparent', opacity: c.other ? 0.35 : 1 }}>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: isSel ? '#fff' : isToday2 ? C.primary : C.t1 }}>{c.d}</Text>
                      {!c.other && <View style={{ flexDirection: 'row', gap: 2 }}>
                        <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: isSel ? 'rgba(255,255,255,0.9)' : C.primary }} />
                      </View>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{ marginHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(240,253,249,0.7)', borderBottomWidth: 1, borderBottomColor: C.border }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.t1 }}>{selDay} {TR_AY[month]} — İlaç Listesi</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', color: C.primary }}>{dayIlaclar.filter(s => s.durum === 'alindi').length}/{dayIlaclar.length} ✓</Text>
              </View>
              {dayIlaclar.map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: i < dayIlaclar.length - 1 ? 1 : 0, borderBottomColor: C.border, gap: 10 }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: C.primary, minWidth: 40 }}>{s.saat}</Text>
                  <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: s.bg, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14 }}>{s.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: s.durum === 'alindi' ? '#A0C8B8' : s.durum === 'atlandi' ? C.red : C.t1 }}>{s.ilacAd}</Text>
                    <Text style={{ fontSize: 10, color: C.t3 }}>{s.doz}</Text>
                  </View>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: s.durum === 'alindi' ? '#E0F5EF' : s.durum === 'atlandi' ? C.redBg : C.amberBg }}>
                    <Text style={{ fontSize: 9, fontWeight: '800', color: s.durum === 'alindi' ? '#0A5C44' : s.durum === 'atlandi' ? C.red : '#B07A00' }}>
                      {s.durum === 'alindi' ? 'ALINDI' : s.durum === 'atlandi' ? 'ATLANDI' : 'BEKLİYOR'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {(view === 'haftalik' || view === 'gunluk') && (
          <View style={{ margin: 12 }}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: C.t1, marginBottom: 10 }}>
              {selDay} {TR_AY[month]} — İlaç Programı
            </Text>
            {dayIlaclar.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 12, borderWidth: 1, borderColor: C.border, marginBottom: 7 }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.primary, minWidth: 40 }}>{s.saat}</Text>
                <Text style={{ fontSize: 18 }}>{s.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: s.durum === 'alindi' ? '#A0C8B8' : s.durum === 'atlandi' ? C.red : C.t1 }}>{s.ilacAd}</Text>
                  <Text style={{ fontSize: 10, color: C.t3 }}>{s.doz}</Text>
                </View>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, backgroundColor: s.durum === 'alindi' ? '#E0F5EF' : s.durum === 'atlandi' ? C.redBg : C.amberBg }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: s.durum === 'alindi' ? '#0A5C44' : s.durum === 'atlandi' ? C.red : '#B07A00' }}>
                    {s.durum === 'alindi' ? '✓ Alındı' : s.durum === 'atlandi' ? '✕ Atlandı' : '⏳ Bekliyor'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== BİLDİRİM EKRANI =====
const BildirimScreen = () => {
  const { ilaclar, kanallar, setKanallar, sessiz, setSessiz } = useApp();
  const [zamanlar, setZamanlar] = useState({ besdk: true, ikidk: true, tamSaat: true, atl: true });
  const [ozelDk, setOzelDk] = useState('10');
  const [ozelList, setOzelList] = useState([]);
  const [kInp, setKInp] = useState({ eposta: '', whatsapp: '', facebook: '', instagram: '' });
  const [onaysizler, setOnaysizler] = useState([
    { id: '1', ad: 'Ramipril 5mg', saat: '07:30', emoji: '🩺' },
    { id: '2', ad: 'Aspirin 100mg', saat: '13:00', emoji: '🔴' },
  ]);

  const program = ilaclar.flatMap(il => il.saatler.map(s => {
    const [h, m] = s.saat.split(':').map(Number);
    const bMin = h * 60 + m - 5;
    const bS = `${Math.floor(bMin / 60).toString().padStart(2, '0')}:${(bMin % 60).toString().padStart(2, '0')}`;
    const now = new Date(); const nowMin = now.getHours() * 60 + now.getMinutes();
    return { saat: bS, ad: `${il.ad} — 5 dk önce`, gonderildi: bMin <= nowMin };
  })).sort((a, b) => a.saat.localeCompare(b.saat));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Hdr title="Bildirimler" sub="Bildirim ayarları & geçmiş" />
      <ScrollView style={{ flex: 1, padding: 13 }} showsVerticalScrollIndicator={false}>

        {/* SESSİZ MOD */}
        <View style={[st.card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginBottom: 10,
          backgroundColor: sessiz ? 'rgba(255,236,236,0.6)' : 'rgba(255,255,255,0.88)', borderColor: sessiz ? '#F5B0B0' : C.border }]}>
          <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: sessiz ? C.redBg : '#F3EEFF', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18 }}>{sessiz ? '🔕' : '🔔'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: C.t1 }}>{sessiz ? 'Sessiz Mod Aktif' : 'Sessiz Mod'}</Text>
            <Text style={{ fontSize: 10, color: C.t3, marginTop: 2 }}>{sessiz ? 'Bildirimler duraklatıldı' : 'Aktifken bildirim gönderilmez'}</Text>
          </View>
          <Switch value={sessiz} onValueChange={setSessiz} trackColor={{ false: C.border, true: C.red }} thumbColor="#fff" />
        </View>

        {/* BUGÜNKÜ PROGRAM */}
        <Acc ico="📋" title="Bugünkü Bildirim Programı" sub={`${program.length} bildirim planlandı`}>
          <View style={{ padding: 10 }}>
            <Text style={st.secLbl}>✓ GÖNDERİLDİ</Text>
            {program.filter(b => b.gonderildi).map((b, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, backgroundColor: '#F0FBF8', borderRadius: 10, borderWidth: 1, borderColor: '#C0E8D8', marginBottom: 5 }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.primary, minWidth: 40 }}>{b.saat}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', flex: 1, color: '#4A6560' }} numberOfLines={1}>{b.ad}</Text>
                <View style={{ backgroundColor: '#E0F5EF', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: '#0A5C44' }}>Gönderildi</Text>
                </View>
              </View>
            ))}
            <Text style={[st.secLbl, { marginTop: 8 }]}>⏳ BEKLİYOR</Text>
            {program.filter(b => !b.gonderildi).map((b, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, backgroundColor: '#FAFFFE', borderRadius: 10, borderWidth: 1, borderColor: C.border, marginBottom: 5 }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: C.t3, minWidth: 40 }}>{b.saat}</Text>
                <Text style={{ fontSize: 11, fontWeight: '700', flex: 1, color: C.t1 }} numberOfLines={1}>{b.ad}</Text>
                <View style={{ backgroundColor: '#EEF7F4', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: C.t3 }}>Bekliyor</Text>
                </View>
              </View>
            ))}
          </View>
        </Acc>

        {/* ZAMANLAMA */}
        <Acc ico="⏰" title="Bildirim Zamanlaması" sub="5 dk · 2 dk · tam saat">
          <View style={{ padding: 10 }}>
            {[{ k: 'besdk', l: '5 Dakika Önce' }, { k: 'ikidk', l: '2 Dakika Önce' }, { k: 'tamSaat', l: 'Tam Saatinde' }, { k: 'atl', l: 'Atlandı Uyarısı' }].map(z => (
              <View key={z.k} style={{ flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#F5FBF9', borderRadius: 10, borderWidth: 1, borderColor: C.border, marginBottom: 6 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: C.t1 }}>{z.l}</Text>
                </View>
                <Switch value={zamanlar[z.k]} onValueChange={v => setZamanlar({ ...zamanlar, [z.k]: v })} trackColor={{ false: C.border, true: C.primary }} thumbColor="#fff" />
              </View>
            ))}
            <View style={{ backgroundColor: '#F0FBF8', borderWidth: 1.5, borderColor: '#B0D8CF', borderStyle: 'dashed', borderRadius: 12, padding: 12, marginTop: 4 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: '#0A5C44', marginBottom: 8 }}>ÖZEL BİLDİRİM ZAMANI</Text>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                <TextInput style={[st.inp, { flex: 1 }]} value={ozelDk} onChangeText={setOzelDk} keyboardType="numeric" placeholder="Dakika..." />
                <Text style={{ fontSize: 11, color: C.t3 }}>dk önce</Text>
                <GBtn label="+ Ekle" onPress={() => {
                  const dk = parseInt(ozelDk);
                  if (!dk || ozelList.includes(dk)) return;
                  setOzelList([...ozelList, dk]);
                }} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                {[10, 15, 20, 30, 60].map(dk => (
                  <TouchableOpacity key={dk} onPress={() => setOzelDk(String(dk))}
                    style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: String(dk) === ozelDk ? C.primary : C.border, backgroundColor: String(dk) === ozelDk ? C.primary : '#fff' }}>
                    <Text style={{ fontSize: 10, fontWeight: '800', color: String(dk) === ozelDk ? '#fff' : C.t3 }}>{dk} dk</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {ozelList.map(dk => (
                <View key={dk} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#E0F5EF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: '#0A5C44' }}>{dk} dk önce</Text>
                  <TouchableOpacity onPress={() => setOzelList(ozelList.filter(d => d !== dk))}>
                    <Text style={{ color: C.red, fontWeight: '900', marginLeft: 4 }}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </Acc>

        {/* KANAL AYARLARI */}
        <Acc ico="📡" title="Bildirim Kanalları" sub="Birden fazla adres eklenebilir">
          <View style={{ padding: 10 }}>
            {[
              { key: 'eposta', ico: '✉️', label: 'E-Posta', ph: 'E-posta ekle...' },
              { key: 'whatsapp', ico: '💬', label: 'WhatsApp', ph: 'Numara ekle...' },
              { key: 'facebook', ico: '📘', label: 'Facebook', ph: 'Kullanıcı adı...' },
              { key: 'instagram', ico: '📷', label: 'Instagram', ph: 'Kullanıcı adı...' },
            ].map(k => (
              <View key={k.key} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Text style={{ fontSize: 14 }}>{k.ico}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: C.t1, flex: 1 }}>{k.label}</Text>
                  <Switch value={kanallar[k.key]?.aktif || false}
                    onValueChange={v => { const y = { ...kanallar }; y[k.key].aktif = v; setKanallar(y); }}
                    trackColor={{ false: C.border, true: C.primary }} thumbColor="#fff" />
                </View>
                {(kanallar[k.key]?.adresler || []).map((a, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 7, backgroundColor: '#F5FBF9', borderRadius: 8, borderWidth: 1, borderColor: C.border, marginBottom: 4 }}>
                    <Text style={{ flex: 1, fontSize: 11, fontWeight: '700', color: C.t1 }}>{a}</Text>
                    <GBtn label="×" red onPress={() => {
                      const y = { ...kanallar }; y[k.key].adresler = y[k.key].adresler.filter((_, j) => j !== i); setKanallar(y);
                    }} />
                  </View>
                ))}
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <TextInput style={[st.inp, { flex: 1 }]} value={kInp[k.key]} onChangeText={v => setKInp({ ...kInp, [k.key]: v })} placeholder={k.ph} />
                  <GBtn label="+ Ekle" onPress={() => {
                    if (!kInp[k.key].trim()) return;
                    const y = { ...kanallar }; y[k.key].adresler = [...(y[k.key]?.adresler || []), kInp[k.key].trim()]; setKanallar(y);
                    setKInp({ ...kInp, [k.key]: '' });
                  }} />
                </View>
                <View style={{ height: 1, backgroundColor: C.border, marginTop: 8 }} />
              </View>
            ))}
          </View>
        </Acc>

        {/* ONAY BEKLİYENLER */}
        <Acc ico="⚠️" title="Onay Bekleyenler" sub={`${onaysizler.length} ilaç bekliyor`}
          badge={onaysizler.length > 0 ? { label: String(onaysizler.length), bg: C.redBg, color: C.red } : null}>
          {onaysizler.length === 0
            ? <View style={{ padding: 16, alignItems: 'center' }}><Text style={{ color: C.t3, fontWeight: '600' }}>Tüm ilaçlar onaylandı ✓</Text></View>
            : onaysizler.map(o => (
              <View key={o.id} style={{ backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FFD6D6', borderRadius: 11, padding: 12, margin: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Text style={{ fontSize: 16 }}>{o.emoji}</Text>
                  <View><Text style={{ fontSize: 12, fontWeight: '800', color: C.red }}>{o.ad}</Text>
                    <Text style={{ fontSize: 10, color: C.t3 }}>{o.saat}</Text></View>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <GBtn label="✓ Alındı" style={{ flex: 1 }} onPress={() => setOnaysizler(onaysizler.filter(x => x.id !== o.id))} />
                  <GBtn label="✕ Atlandı" red style={{ flex: 1 }} onPress={() => setOnaysizler(onaysizler.filter(x => x.id !== o.id))} />
                </View>
              </View>
            ))}
        </Acc>

        {/* GEÇMİŞ */}
        <Acc ico="🕐" title="Geçmiş Bildirimler" sub="Son 24 saat" badge={{ label: '6', bg: '#E0F5EF', color: '#0A5C44' }}>
          {[
            { ad: 'Metformin 1000mg', zaman: 'Bugün 08:00', durum: 'alindi' },
            { ad: 'Rosuvastatin 20mg', zaman: 'Dün 22:00', durum: 'alindi' },
            { ad: 'Ramipril 5mg', zaman: 'Bugün 07:30', durum: 'atlandi' },
            { ad: 'Aspirin 100mg', zaman: 'Bugün 13:00', durum: 'bekliyor' },
            { ad: 'Metformin 1000mg', zaman: 'Dün 20:00', durum: 'alindi' },
            { ad: 'Ramipril 5mg', zaman: 'Dün 07:30', durum: 'alindi' },
          ].map((g, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 8, marginHorizontal: 8, marginBottom: 5, borderRadius: 10, borderWidth: 1,
              backgroundColor: g.durum === 'alindi' ? '#F0FBF8' : g.durum === 'atlandi' ? '#FFF5F5' : '#FFF9EC',
              borderColor: g.durum === 'alindi' ? C.border : g.durum === 'atlandi' ? '#FFD6D6' : '#FFE8A0', gap: 9 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: g.durum === 'alindi' ? C.primary : g.durum === 'atlandi' ? C.red : C.amber }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: C.t1 }} numberOfLines={1}>{g.ad}</Text>
                <Text style={{ fontSize: 10, color: C.t3 }}>{g.zaman}</Text>
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: g.durum === 'alindi' ? '#E0F5EF' : g.durum === 'atlandi' ? C.redBg : C.amberBg }}>
                <Text style={{ fontSize: 9, fontWeight: '800', color: g.durum === 'alindi' ? '#0A5C44' : g.durum === 'atlandi' ? C.red : '#B07A00' }}>
                  {g.durum === 'alindi' ? '✓ Alındı' : g.durum === 'atlandi' ? '✕ Atlandı' : '⏳ Bekliyor'}
                </Text>
              </View>
            </View>
          ))}
        </Acc>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ===== RAPOR EKRANI =====
const GUN_DATA = [
  { gun: 'Pzt', ali: 4, atl: 0 }, { gun: 'Sal', ali: 3, atl: 1 }, { gun: 'Çar', ali: 4, atl: 0 },
  { gun: 'Per', ali: 2, atl: 2 }, { gun: 'Cum', ali: 4, atl: 0 }, { gun: 'Cmt', ali: 3, atl: 1 }, { gun: 'Paz', ali: 2, atl: 2 },
];
const ARALIKLAR = [
  { k: '7g', l: '7 Gün', uyum: 88, ali: 56, atl: 8, top: 64 },
  { k: '30g', l: '30 Gün', uyum: 85, ali: 102, atl: 18, top: 120 },
  { k: '3ay', l: '3 Ay', uyum: 82, ali: 198, atl: 43, top: 241 },
  { k: 'tum', l: 'Tüm Zaman', uyum: 84, ali: 248, atl: 47, top: 295 },
];

const RaporScreen = () => {
  const [aralik, setAralik] = useState('tum');
  const [paylasim, setPaylasim] = useState(false);
  const [secKanal, setSecKanal] = useState(['pdf']);
  const cur = ARALIKLAR.find(a => a.k === aralik);
  const maxBar = Math.max(...GUN_DATA.map(d => d.ali + d.atl));
  const W = Dimensions.get('window').width - 52;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Hdr title="Raporlar" sub="İlaç kullanım istatistikleri"
        right={<TouchableOpacity onPress={() => setPaylasim(true)}
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 }}>
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>⬆ Paylaş</Text>
        </TouchableOpacity>} />

      <View style={{ flexDirection: 'row', gap: 5, marginHorizontal: 13, marginVertical: 10 }}>
        {ARALIKLAR.map(a => (
          <TouchableOpacity key={a.k} onPress={() => setAralik(a.k)}
            style={{ flex: 1, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: aralik === a.k ? C.primary : C.border, backgroundColor: aralik === a.k ? C.primary : 'rgba(255,255,255,0.7)', alignItems: 'center' }}>
            <Text style={{ fontSize: 9, fontWeight: '800', color: aralik === a.k ? '#fff' : C.t3 }}>{a.l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: 7, marginHorizontal: 13, marginBottom: 8 }}>
        {[{ v: `%${cur.uyum}`, l: 'UYUM', c: C.primary }, { v: cur.ali, l: 'ALINDI', c: C.primary }, { v: cur.atl, l: 'ATLANDI', c: C.red }, { v: cur.top, l: 'TOPLAM', c: C.t3 }].map((s, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 9, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '800', color: s.c }}>{s.v}</Text>
            <Text style={{ fontSize: 8, color: C.t3, fontWeight: '700', marginTop: 2 }}>{s.l}</Text>
          </View>
        ))}
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 13 }} showsVerticalScrollIndicator={false}>
        <Acc ico="📊" title="Günlük Alındı / Atlandı" sub="Son 7 gün">
          <View style={{ padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 4 }}>
              {GUN_DATA.map((d, i) => {
                const aH = Math.round((d.ali / maxBar) * 70);
                const atH = Math.round((d.atl / maxBar) * 70);
                return (
                  <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', justifyContent: 'flex-end', flex: 1, gap: 1 }}>
                      {atH > 0 && <View style={{ height: atH, backgroundColor: C.red, borderRadius: 3 }} />}
                      {aH > 0 && <View style={{ height: aH, backgroundColor: C.primary, borderRadius: 3 }} />}
                    </View>
                    <Text style={{ fontSize: 8, color: C.t3, fontWeight: '700', marginTop: 3 }}>{d.gun}</Text>
                  </View>
                );
              })}
            </View>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: C.primary }} />
                <Text style={{ fontSize: 10, fontWeight: '700', color: C.t2 }}>Alındı</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: C.red }} />
                <Text style={{ fontSize: 10, fontWeight: '700', color: C.t2 }}>Atlandı</Text>
              </View>
            </View>
          </View>
        </Acc>

        <Acc ico="📅" title="Haftalık Özet" sub="Hafta bazında uyum oranları">
          <View style={{ padding: 10 }}>
            {[{ h: '24–30 Mart', u: 84, c: C.primary }, { h: '17–23 Mart', u: 91, c: C.primary }, { h: '10–16 Mart', u: 75, c: C.amber }, { h: '3–9 Mart', u: 88, c: C.primary }, { h: '24 Şub–2 Mart', u: 62, c: C.red }].map((h, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 8, backgroundColor: '#F5FBF9', borderRadius: 10, borderWidth: 1, borderColor: C.border, marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: C.t1, minWidth: 90 }}>{h.h}</Text>
                <View style={{ flex: 1, height: 8, backgroundColor: C.border, borderRadius: 4, overflow: 'hidden' }}>
                  <View style={{ width: `${h.u}%`, height: '100%', backgroundColor: h.c, borderRadius: 4 }} />
                </View>
                <Text style={{ fontSize: 11, fontWeight: '800', color: h.c, minWidth: 36, textAlign: 'right' }}>%{h.u}</Text>
              </View>
            ))}
          </View>
        </Acc>

        <Acc ico="⚠️" title="En Çok Atlanan İlaçlar" sub="Dikkat gerektiren ilaçlar">
          <View style={{ padding: 10 }}>
            {[{ r: 1, ad: 'Ramipril 5mg', s: 18, p: 90, rBg: C.redBg, rC: C.red }, { r: 2, ad: 'Aspirin 100mg', s: 14, p: 70, rBg: C.amberBg, rC: '#B07A00' }, { r: 3, ad: 'Metformin 1000mg', s: 9, p: 45, rBg: '#EEF7F4', rC: C.t2 }].map((a, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 9, backgroundColor: '#FFF8F8', borderRadius: 11, borderWidth: 1, borderColor: '#FFD6D6', marginBottom: 6 }}>
                <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: a.rBg, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 11, fontWeight: '800', color: a.rC }}>{a.r}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: C.t1 }}>{a.ad}</Text>
                  <Text style={{ fontSize: 10, color: C.red, fontWeight: '700', marginTop: 1 }}>{a.s} kez atlandı</Text>
                </View>
                <View style={{ width: 60, height: 6, backgroundColor: '#FFD6D6', borderRadius: 3, overflow: 'hidden' }}>
                  <View style={{ width: `${a.p}%`, height: '100%', backgroundColor: C.red, borderRadius: 3 }} />
                </View>
              </View>
            ))}
          </View>
        </Acc>

        <Acc ico="💊" title="İlaç Bazında Detay" sub="Her ilaç için istatistik">
          <View style={{ padding: 10 }}>
            {[{ ad: 'Metformin 1000mg', acik: 'Kan şekeri', u: 94, ali: 148, atl: 9, top: 157, bg: '#E0F5EF', em: '💊', c: C.primary },
              { ad: 'Ramipril 5mg', acik: 'Tansiyon', u: 76, ali: 57, atl: 18, top: 75, bg: '#EAF0FF', em: '🩺', c: C.amber },
              { ad: 'Rosuvastatin 20mg', acik: 'Kolesterol', u: 90, ali: 27, atl: 3, top: 30, bg: '#FFF5E6', em: '💉', c: C.primary },
              { ad: 'Aspirin 100mg', acik: 'Kan sulandırıcı', u: 82, ali: 16, atl: 4, top: 20, bg: '#FFECEC', em: '🔴', c: C.amber },
            ].map((il, i) => (
              <View key={i} style={{ backgroundColor: '#F5FBF9', borderRadius: 12, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, padding: 9, borderBottomWidth: 1, borderBottomColor: C.border }}>
                  <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: il.bg, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{il.em}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '800', color: C.t1 }}>{il.ad}</Text>
                    <Text style={{ fontSize: 10, color: C.t3 }}>{il.acik}</Text>
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: '800', color: il.c }}>%{il.u}</Text>
                </View>
                <View style={{ height: 5, backgroundColor: C.border, marginHorizontal: 11, marginTop: 4, borderRadius: 3, overflow: 'hidden' }}>
                  <View style={{ width: `${il.u}%`, height: '100%', backgroundColor: il.c, borderRadius: 3 }} />
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 11, paddingVertical: 8 }}>
                  {[{ v: il.ali, l: 'ALINDI', c: C.primary }, { v: il.atl, l: 'ATLANDI', c: C.red }, { v: il.top, l: 'TOPLAM', c: C.t3 }].map((s, j) => (
                    <View key={j} style={{ flex: 1, alignItems: 'center', borderRightWidth: j < 2 ? 1 : 0, borderRightColor: C.border }}>
                      <Text style={{ fontSize: 14, fontWeight: '800', color: s.c }}>{s.v}</Text>
                      <Text style={{ fontSize: 9, color: C.t3, fontWeight: '700', marginTop: 1 }}>{s.l}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </Acc>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* PAYLAŞIM */}
      {paylasim && (
        <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(18,32,30,0.55)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 18, paddingBottom: Platform.OS === 'ios' ? 34 : 18 }}>
            <View style={{ width: 36, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: 'center', marginBottom: 14 }} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: C.t1, marginBottom: 4 }}>Raporu Paylaş</Text>
            <Text style={{ fontSize: 11, color: C.t3, marginBottom: 14 }}>Göndermek istediğin kanalları seç</Text>
            {[{ k: 'pdf', ico: '📄', l: 'PDF olarak indir', bg: C.redBg }, { k: 'wp', ico: '💬', l: 'WhatsApp ile gönder', bg: '#E8F5E9' }, { k: 'mail', ico: '✉️', l: 'E-Posta ile gönder', bg: '#E8F5E9' }, { k: 'yazdir', ico: '🖨️', l: 'Yazdır', bg: C.blueBg }].map(k => (
              <TouchableOpacity key={k.k} onPress={() => setSecKanal(secKanal.includes(k.k) ? secKanal.filter(x => x !== k.k) : [...secKanal, k.k])}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#F5FBF9', borderRadius: 11, borderWidth: 1.5, borderColor: secKanal.includes(k.k) ? C.primary : C.border, gap: 10, marginBottom: 8 }}>
                <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: k.bg, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14 }}>{k.ico}</Text>
                </View>
                <Text style={{ flex: 1, fontSize: 12, fontWeight: '700', color: C.t1 }}>{k.l}</Text>
                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: secKanal.includes(k.k) ? C.primary : C.border, backgroundColor: secKanal.includes(k.k) ? C.primary : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                  {secKanal.includes(k.k) && <Text style={{ color: '#fff', fontSize: 10, fontWeight: '900' }}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ flexDirection: 'row', gap: 7, marginTop: 4 }}>
              <TouchableOpacity onPress={() => setPaylasim(false)} style={{ flex: 1, padding: 10, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.bg, alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', color: C.t2 }}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Alert.alert('✅', secKanal.join(' + ') + ' ile gönderildi!'); setPaylasim(false); }}
                style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', color: '#fff' }}>Paylaş / İndir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

// ===== NAV BAR =====
const TABS = [
  { k: 'Profil', ico: '👤', l: 'PROFİL' }, { k: 'Ilaclar', ico: '💊', l: 'İLAÇLAR' },
  { k: 'Takvim', ico: '📅', l: 'TAKVİM' }, { k: 'Bildirim', ico: '🔔', l: 'BİLDİRİM' }, { k: 'Rapor', ico: '📊', l: 'RAPOR' },
];

// ===== ANA UYGULAMA =====
const st = StyleSheet.create({
  inp: { backgroundColor: '#F5FBF9', borderWidth: 1.5, borderColor: '#D6EDE8', borderRadius: 9, padding: 8, fontSize: 12, fontWeight: '600', color: '#12201E', marginBottom: 6 },
  lbl: { fontSize: 10, fontWeight: '800', color: '#9DB8B2', letterSpacing: 0.4, marginBottom: 5, marginTop: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#D6EDE8', gap: 8 },
  infoLbl: { fontSize: 9, color: '#9DB8B2', fontWeight: '700', letterSpacing: 0.4 },
  infoVal: { fontSize: 12, color: '#12201E', fontWeight: '700', marginTop: 1 },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#D6EDE8', overflow: 'hidden', marginBottom: 7 },
  secLbl: { fontSize: 9, fontWeight: '800', color: '#9DB8B2', letterSpacing: 0.5, marginBottom: 6 },
});

export default function App() {
  const [tab, setTab] = useState('Profil');
  const screens = { Profil: ProfilScreen, Ilaclar: IlaclarScreen, Takvim: TakvimScreen, Bildirim: BildirimScreen, Rapor: RaporScreen };
  const Screen = screens[tab];

  return (
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <View style={{ flex: 1 }}>
          <Screen />
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.97)', borderTopWidth: 1, borderTopColor: '#D6EDE8', paddingTop: 9, paddingBottom: Platform.OS === 'ios' ? 24 : 14 }}>
          {TABS.map(t => (
            <TouchableOpacity key={t.k} style={{ flex: 1, alignItems: 'center', gap: 2 }} onPress={() => setTab(t.k)} activeOpacity={0.7}>
              <Text style={{ fontSize: 18 }}>{t.ico}</Text>
              <Text style={{ fontSize: 9, fontWeight: '800', color: tab === t.k ? C.primary : '#9DB8B2' }}>{t.l}</Text>
              {tab === t.k && <View style={{ width: 16, height: 2.5, borderRadius: 2, backgroundColor: C.primary, marginTop: 1 }} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AppProvider>
  );
}
