"use client";

import { useState } from "react";
import { userClientService } from "@/services/user.client.service";
import { Shield, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

const AVAILABLE_ROLES = ["USER", "TEACHER", "ADMIN"];

const roleConfig: Record<string, { color: string; bg: string }> = {
  ADMIN: { color: 'text-primary', bg: 'bg-primary/10' },
  TEACHER: { color: 'text-secondary', bg: 'bg-secondary/10' },
  USER: { color: 'text-accent', bg: 'bg-accent/10' }
};

export default function UpdateUserRoleButton({ 
  userId, 
  userRole 
}: { 
  userId: string; 
  userRole: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUserRoleUpdate = async (id: string, role: string) => {
    if (role === userRole) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const updatedProfile = await userClientService.updateUserProfileById(id, role);
      if (updatedProfile.success || updatedProfile) {
        setMessage({ type: 'success', text: `Role updated to ${role}` });
        setIsOpen(false);
      } else {
        setMessage({ type: 'error', text: 'Failed to update role' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update role' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {message && (
        <div className={`p-3 rounded-lg flex items-center gap-2 border text-sm ${
          message.type === 'success'
            ? 'bg-primary/5 border-primary/20'
            : 'bg-destructive/5 border-destructive/20'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          )}
          <p className={message.type === 'success' ? 'text-primary font-medium' : 'text-destructive font-medium'}>
            {message.text}
          </p>
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {loading ? 'Updating...' : `Set ${userRole}`}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
            {AVAILABLE_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => handleUserRoleUpdate(userId, role)}
                disabled={loading}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all flex items-center justify-between ${
                  role === userRole
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-background/50 text-foreground'
                } disabled:opacity-50 disabled:cursor-not-allowed border-b border-border/50 last:border-b-0`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {role}
                </div>
                {role === userRole && <CheckCircle className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
