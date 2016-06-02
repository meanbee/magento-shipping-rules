<?php
/**
 * @implements Meanbee_Shippingrules_Calculator_Register_Abstract,
 *             Meanbee_Shippingrules_Calculator_Singleton_Interface
 */
trait Meanbee_Shippingrules_Calculator_Singleton_Trait {
    protected static $instance;

    /**
     * Accessor for instance of singleton class.
     * @return $this
     */
    final public static function instance()
    {
        return isset(static::$instance) ? static::$instance : static::$instance = new static;
    }
}
