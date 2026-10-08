import { User } from '../config/supabase';
import { User as PrivyUser } from '@privy-io/react-auth';

// LOCAL-ONLY STUB: This version of AuthService skips all Supabase calls
// and treats every valid username as available. The local server doesn't
// need user records or username uniqueness — it's a single-player-ish
// private game.

export class AuthService {
  /** No-op: user sync is not needed for a local server. */
  static async syncUserToDatabase(_privyUser: PrivyUser): Promise<User | null> {
    return null;
  }

  /** No-op: no user profile stored locally. */
  static async getUserProfile(_privyUserId: string): Promise<User | null> {
    return null;
  }

  /** No-op: soft-delete is not applicable. */
  static async deactivateUser(_privyUserId: string): Promise<boolean> {
    return true;
  }

  // ========== USERNAME MANAGEMENT ==========

  /** Validates username format (unchanged). */
  static validateUsername(username: string): { isValid: boolean; error?: string } {
    const trimmed = username.trim();

    if (trimmed.length < 3) {
      return { isValid: false, error: 'Username must be at least 3 characters long' };
    }
    if (trimmed.length > 20) {
      return { isValid: false, error: 'Username cannot be longer than 20 characters' };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return {
        isValid: false,
        error: 'Username can only contain letters, numbers, underscores, and hyphens',
      };
    }
    return { isValid: true };
  }

  /**
   * LOCAL STUB: Format-check only, always "available".
   * No Supabase lookup, so it never fails in a private server.
   */
  static async checkUsernameAvailability(
    username: string
  ): Promise<{ available: boolean; error?: string }> {
    const validation = this.validateUsername(username);
    if (!validation.isValid) {
      return { available: false, error: validation.error };
    }
    return { available: true };
  }

  /** LOCAL STUB: No stored username. */
  static async getCurrentUsername(
    _userId: string
  ): Promise<{ username: string | null; error?: string }> {
    return { username: null };
  }

  /**
   * LOCAL STUB: Format-check only, always "succeeds".
   * Does not write to any database.
   */
  static async setUsername(
    _userId: string,
    username: string
  ): Promise<{ success: boolean; error?: string }> {
    const validation = this.validateUsername(username);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }
    return { success: true };
  }

  /** LOCAL STUB: Pretend the user already has a username. */
  static async hasUsername(_userId: string): Promise<boolean> {
    return true;
  }
}
