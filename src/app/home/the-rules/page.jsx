import React from "react";
import Navbar from "../../components/navbar/Navbar";
import TabBar from "../../components/tabBar/TabBar";
import styles from "./styles.module.scss";

function page() {
  return (
    <div>
      <Navbar></Navbar>
      <main className={styles.main}>
        <ul>
          <li>
            BEYOND INC platformu kullanıcıları borsanın karmaşık grafikleri ve
            sayılarından kurtarıp en risksiz şekilde yatırım yapmasını sağlar.
            Varlıklarınız BEYOND INC tarafından NASDAQ'da değerlendirilir ve bu
            yatırımlar size özel olan telefon numaranız üstünden listelenir.
            <b>
              Bu yüzden ikinci bir hesap açmaya çalışmanız halinde hesap
              kayıtlarınız silinir. Lütfen platforma sadece yakınlarınızın
              daveti üzerinden giriniz.
            </b>
          </li>
          <li>
            <b>1 Gün içinde 2 ayrı çekim yapmayınız.</b> yapmanız halinde
            moderatörler tarafından reddedilir.
          </li>
          <li>
            Yatırımlarınızda karşıya geçecek tutarı tam sayı şeklinde
            ayarlayınız.
          </li>
          <li>
            Doğrulanmamış hesaplar <b>çekim yapamaz.</b> hesabınızın
            doğrulanması için en az 100 USDT yatırım yapmanız gerekmektedir.
          </li>
          <li>
            Fon yatırımında hergün kârınız hesabınıza yansıtılır. ilk 3 günden
            sonra kârınızın hesabınıza yansıtılması için 3 gün = 1 davet (Min
            100USDT) gerekmektedir.
          </li>
          <li>
            Yatırım-Çekim işlemlerinde zorlanıyorsanız veya bir sorun oluştu ise
            lütfen "Müşteri Hizmetleri" ile iletişime geçiniz.
          </li>
        </ul>
      </main>
      <TabBar></TabBar>
    </div>
  );
}

export default page;
