const faLabels = {
   components: {
      itemCard: {
         'yeka': 'تومان'
      }
   },

   sidebarItems: {
      home: 'صفحه اصلی',
      cart: 'سبد خرید',
      favorite: 'علاقه مندی ها',
      reserve: 'رزرو میز',
      orders: 'سفارش های ثبت شده',
      account: 'حساب کاربری',
      about: 'درباره مجموعه'
   },

   pages: {
      checkout: {
         delivery: 'سفارش آنلاین',
         'pre-order': 'تحویل حضوری',
         order: 'حضوری',
         cash: 'نقدی',
         online: 'آنلاین'
      },
      cart: {
         emptyCart: 'سبد خرید شما خالی است !'
      }
   },

   input: {
      label: {
         fullName: 'نام و نام خانوادگی',
         phoneNumber: 'شماره همراه',
         email: 'ایمیل ( اختیاری )',
         persons: 'تعداد نفرات',
         date: 'تاریخ رزرو',
         time: 'ساعت رزرو'
      },
      placeholder: {
         fullName: 'کاربر تستی',
         phoneNumber: '09121234567',
         email: 'menu-bar.ir@gmail.com',
         persons: '5'
      }
   }
}

const enLabels = {
   components: {
      itemCard: {
         'yeka': '$'
      }
   }
}

const Labels = {
   fa: faLabels,
   en: enLabels
}

export default Labels;