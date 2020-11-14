import { useRouter } from 'next/router';

export default function AdminOrderShowPage(props) {
    const router = useRouter();
    console.log(router);
    return (
        <div>ADMIN ORDER PAGE!</div>
    )
}