import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

export default function ConfirmModal({
    show,
    title,
    message,
    confirmLabel = 'Confirm',
    busy = false,
    onConfirm,
    onCancel,
}) {
    return (
        <Modal show={show} onClose={onCancel} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>
                    {title}
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
                    {message}
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onCancel} disabled={busy}>
                        Cancel
                    </SecondaryButton>
                    <DangerButton onClick={onConfirm} disabled={busy}>
                        {busy ? 'Working...' : confirmLabel}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
