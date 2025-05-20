'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebtStore } from '@/stores/debtStore'
import { showInfo, showSuccess } from '@/lib/toastUtil'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const DebtTable = () => {
    const debts = useDebtStore((s) => s.debts);
    const removeDebt = useDebtStore((s) => s.removeDebt);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        removeDebt(id);
        showSuccess('Debt item deleted.');
        setDeletingId(null);
    }

    if (debts.length === 0) return <p className="text-gray-500 dark:text-gray-400 text-sm">No debt records yet. Add one above to get started.</p>

    return (
        <div className='bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md'>
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">📃 All Debts</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[30%]'>Name</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Monthly Payment</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead className='text-right'></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <AnimatePresence>
                        {debts.map((d) => (
                            <motion.tr key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.amount.toLocaleString()} ฿</TableCell>
                                <TableCell>{d.monthlyPayment.toLocaleString()} ฿</TableCell>
                                <TableCell>{d.startMonth} - {d.endMonth}</TableCell>
                                <TableCell className='text-right'>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant='destructive' size='sm' onClick={() => { setDeletingId(d.id); showInfo('Please confirm deletion.') }}>
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action will permanently delete this debt item. This cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant='outline' onClick={() => setDeletingId(null)}>Cancel</Button>
                                                <Button variant='destructive' onClick={() => deletingId && handleDelete(deletingId)}>Confirm Delete</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    )
}

export default DebtTable