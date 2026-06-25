const InvoiceWidget = {
    props: ['invoice'],
    template: `
        <div class="invoice-a4">
           <div class="flex justify-between items-center mb-4 border-b-2 border-gray-100 pb-3">
                <div class="w-20 h-20 bg-white flex items-center justify-center p-2 rounded-xl">
                    <img src="logo1.png" alt="Logo" class="w-full h-full object-contain" onerror="this.src='https://i.ibb.co/68vD84D/logo1.png'">
                </div>
                <div class="text-center">
                    <h1 class="text-3xl font-black text-[#3a2016]">فاتورة طلب</h1>
                </div>
                <div class="text-left font-black text-[11px] space-y-0.5">
                    <p class="text-2xl text-[#3a2016] pb-1">#{{ invoice.orderId }}</p>
                    <p>التاريخ : {{ formatDateLong(invoice.timestamp) }}</p>
                    <p>الرقم الوطني الموحد : 7028380058</p>
                    <p>تاريخ الإصدار : 21/03/2022</p>
                    <p>حالة السجل : نشط</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-4 text-[11px]">
                <div class="inv-info-box space-y-1">
                    <span class="text-gray-400 font-bold">بيانات العميل :</span>
                    <p class="font-black text-base text-gray-900">{{ invoice.client?.name }}</p>
                    <p class="font-black text-[#3a2016] text-sm">{{ invoice.client?.address }}</p>
                    <p class="font-bold text-gray-600">المملكة العربية السعودية، {{ invoice.client?.city }}</p>
                    <p dir="ltr" class="font-black text-sm">{{ invoice.client?.phone }}</p>
                </div>
                <div class="inv-info-box text-left space-y-1 border-r-4 border-[#3a2016]">
                    <span class="text-gray-400 font-bold">المورد :</span>
                    <p class="font-black text-sm text-[#3a2016]">مؤسسة حكاية ماسة للتجارة</p>
                    <p class="font-bold">المملكة العربية السعودية، الرياض</p>
                    <p class="font-bold">المعيقلية، الديرة، SA</p>
                    <p dir="ltr" class="font-black">0500708832</p>
                </div>
            </div>
            
            <table class="inv-table">
                <thead>
                    <tr>
                        <th class="rounded-tr-lg">تفاصيل المنتج والخيارات المختارة</th>
                        <th class="text-center w-12">الكمية</th>
                        <th class="text-center w-28">سعر الوحدة</th>
                        <th class="text-left rounded-tl-lg w-28">الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in invoice.products" :key="p.id">
                        <td>
                            <div class="flex gap-3">
                                <div class="w-16 h-16 bg-gray-50 border rounded-lg flex items-center justify-center p-1 shrink-0">
                                    <img :src="\`products/\${p.name}.webp\`" :data-name="p.name" onerror="if(!this.getAttribute('data-j')){this.setAttribute('data-j','1'); this.src='products/'+this.getAttribute('data-name')+'.jpg';} else if(!this.getAttribute('data-p')){this.setAttribute('data-p','1'); this.src='products/'+this.getAttribute('data-name')+'.png';} else {this.onerror=null; this.src='logo1.png';}" class="w-full h-full object-contain rounded-md">
                                </div>
                                <div class="space-y-1 flex-1">
                                    <p class="font-black text-sm text-[#3a2016]">{{ p.name }} <span v-if="p.villaNo" class="text-[10px] text-gray-500">(فيلا {{ p.villaNo }})</span></p>
                                    <div class="text-[10px] space-y-1 mt-1.5">
                                        <p class="font-bold text-gray-700 flex justify-between">
                                            <span>• سعر المنشر الأساسي:</span> <span class="font-black">{{ p.basePrice }} SAR</span>
                                        </p>
                                        <p class="font-bold text-gray-700" :class="{'text-gray-500': p.color === 'white' || p.color === 'أبيض' || p.color === 'silver' || p.color === 'فضي'}">
                                            <span>• اللون ({{ p.color === 'white' || p.color === 'أبيض' ? 'أبيض' : (p.color === 'black' || p.color === 'أسود' ? 'أسود' : (p.color === 'gold' || p.color === 'ذهبي' ? 'ذهبي' : (p.color === 'silver' || p.color === 'فضي' ? 'فضي' : p.color))) }})</span> 
                                        </p>
                                        <p v-if="p.hasLighting" class="font-bold text-gray-700 flex justify-between">
                                            <span>• إضافة إضاءة:</span> <span class="font-black">+129 SAR</span>
                                        </p>
                                        <p v-if="p.customDesign" class="font-bold text-gray-700 flex justify-between">
                                            <span>• تصميم خاص:</span> <span class="font-black">+50 SAR</span>
                                        </p>
                                        <div class="border-t border-dashed mt-1 pt-1 space-y-0.5">
                                            <p v-if="p.nationalAddress" class="font-bold text-gray-600">العنوان الوطني: <span class="font-black text-black">{{ p.nationalAddress }}</span></p>
                                            <p v-if="p.customName" class="font-bold text-gray-600">الاسم المطلوب: <span class="font-black text-blue-700 italic">{{ p.customName }}</span></p>
                                            <p v-if="p.notes" class="font-bold text-gray-500 italic">ملاحظات: {{ p.notes }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center font-black text-base bg-gray-50/30 align-middle">{{ p.count }}</td>
                        <td class="text-center font-black text-sm align-middle text-[#3a2016]">SAR {{ p.price }}</td>
                        <td class="text-left font-black text-sm align-middle text-[#3a2016]">SAR {{ p.price * p.count }}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="mt-4 mr-auto w-[350px]">
                <div class="space-y-2 border-t-2 border-[#3a2016] pt-3 text-xs mb-3">
                    <div class="flex justify-between font-bold text-gray-700">
                        <span>إجمالي المنتجات</span>
                        <span class="font-black text-black text-sm">SAR {{ invoice.subTotal }}</span>
                    </div>
                    <div v-if="invoice.discountRate > 0" class="flex justify-between font-bold text-red-500">
                        <span>الخصم ({{ invoice.discountRate }}%)</span>
                        <span class="font-black text-red-600 text-sm">- SAR {{ invoice.discountValue }}</span>
                    </div>
                    <div class="flex justify-between font-bold text-green-600 border-b border-gray-100 pb-3">
                        <span>تكلفة التوصيل والتركيب</span>
                        <span class="font-black underline decoration-2">مجاناً</span>
                    </div>
                    
                    <div class="flex justify-between items-center bg-[#3a2016] text-white p-4 rounded-xl shadow-md mt-2 relative">
                        <div class="flex flex-col gap-1">
                            <span class="font-black text-base">الإجمالي النهائي</span>
                            <div v-if="invoice.paymentStatus === 'تم الدفع'" class="flex items-center gap-1.5 bg-green-500/20 text-green-200 px-2 py-0.5 rounded-md border border-green-400/50 w-fit">
                                <span class="text-[10px] font-black">✓ تم الدفع</span>
                            </div>
                            <div v-else-if="invoice.paymentStatus === 'الدفع عند الاستلام' || invoice.payOnDelivery" class="flex flex-col items-center gap-1 bg-red-500/10 text-red-600 px-3 py-1.5 rounded-md border border-red-200 w-fit">
                                <span class="text-[10px] font-black">✗ غير مدفوع</span>
                                <span class="text-[9px] font-bold text-gray-500">طريقة الدفع: الدفع عند الاستلام</span>
                            </div>
                            <div v-else class="flex flex-col items-center gap-1 bg-red-500/10 text-red-600 px-3 py-1.5 rounded-md border border-red-200 w-fit">
                                <span class="text-[10px] font-black">✗ غير مدفوع</span>
                                <span class="text-[9px] font-bold text-gray-500">طريقة الدفع: الدفع عند الاستلام</span>
                            </div>
                        </div>
                        <span class="font-black text-2xl">SAR {{ invoice.totalAmount }}</span>
                    </div>
                </div>

                <div v-if="invoice.receipts && invoice.receipts.length > 0" class="border-2 border-dashed border-gray-200 p-3 rounded-xl bg-gray-50/50">
                    <p class="text-[10px] font-black text-gray-500 mb-2 border-b border-gray-200 pb-1">إيصالات الدفع المرفقة للطلب:</p>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="(img, idx) in invoice.receipts" :key="idx" class="w-[70px] h-[70px] border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                            <img :src="img" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
            </div>

            <div class="invoice-footer mt-auto">
                <p class="font-black text-[#3a2016] text-sm mb-1">شكراً لتسوقكم معنا في منشر</p>
                <p class="text-[10px] text-gray-500 mb-1">البضاعة المباعة لا ترد ولا تستبدل إلا في حالة وجود عيب مصنعي خلال 3 أيام من تاريخ الاستلام.</p>
                <p class="text-[10px] font-bold text-gray-600">
                    للتواصل والدعم الفني: <span dir="ltr" class="text-[#3a2016]">0500708832</span>
                </p>
            </div>
        </div>
    `,
    methods: {
        formatDateLong(ts) {
            return ts ? new Date(ts).toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) : '-';
        }
    }
};

window.InvoiceWidget = InvoiceWidget;
