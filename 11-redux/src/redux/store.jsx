import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

// Store, Redux uygulamasının merkezi veri deposudur. Store, uygulamanın tüm state'ini tutar ve state'in güncellenmesi için gerekli olan reducer fonksiyonlarını içerir.
// Store, uygulamanın tüm componentleri tarafından erişilebilir ve componentler, store'daki state'i okuyabilir veya action dispatch edebilir.
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})