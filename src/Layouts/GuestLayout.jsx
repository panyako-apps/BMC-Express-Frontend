
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import NavigationTop from "@/Components/Navigation/NavigationTop.vue"

export default function GuestLayout({children}){
    return (

        <div class="">
            <NavigationTop />
            <div class="px-4 pt-8">
                {children}
            </div>
        </div>

    );
}
